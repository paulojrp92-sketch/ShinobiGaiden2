import type {Action,InputFrame} from "../types";
const actions:Action[]=["jump","light","heavy","weapon","special1","special2","special3"];
export type Bindings=Record<"left"|"right"|"down"|"block"|"charge"|Action,string>;
export const defaults:[Bindings,Bindings]=[
{left:"KeyA",right:"KeyD",down:"KeyS",jump:"KeyW",light:"KeyF",heavy:"KeyG",weapon:"KeyH",special1:"KeyJ",special2:"KeyK",special3:"KeyL",block:"ShiftLeft",charge:"KeyE"},
{left:"ArrowLeft",right:"ArrowRight",down:"ArrowDown",jump:"ArrowUp",light:"Numpad1",heavy:"Numpad2",weapon:"Numpad3",special1:"Numpad4",special2:"Numpad5",special3:"Numpad6",block:"Numpad0",charge:"NumpadAdd"}];
export class InputManager {
 readonly held=new Set<string>();readonly edges=new Set<string>();private padPrevious=[new Set<number>(),new Set<number>()];
 bindings:[Bindings,Bindings]=structuredClone(defaults);
 constructor(){try{const v=JSON.parse(localStorage.getItem("shinobi-bindings")??"null") as [Bindings,Bindings]|null;if(v&&v.length===2)this.bindings=v;}catch{/* defaults */}
 addEventListener("keydown",e=>{if(e.target instanceof HTMLInputElement)return;if(!this.held.has(e.code))this.edges.add(e.code);this.held.add(e.code);if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","F3","Tab"].includes(e.code))e.preventDefault();});
 addEventListener("keyup",e=>this.held.delete(e.code));addEventListener("blur",()=>this.clear());}
 clear():void{this.held.clear();this.edges.clear();this.padPrevious=[new Set(),new Set()];}
 shortcut(code:string):boolean{const has=this.edges.has(code);this.edges.delete(code);return has;}
 poll():[InputFrame,InputFrame]{const pads=navigator.getGamepads?.()??[];const result=this.bindings.map((b,i)=>{
 const pressed=actions.filter(a=>this.edges.has(b[a]));const frame:InputFrame={axis:Number(this.held.has(b.right))-Number(this.held.has(b.left)),down:this.held.has(b.down),block:this.held.has(b.block),charge:this.held.has(b.charge),pressed};
 const pad=pads[i];if(pad){const buttons=new Set(pad.buttons.map((x,n)=>x.pressed?n:-1).filter(x=>x>=0));const prev=this.padPrevious[i];const modifier=buttons.has(6);
 frame.axis=Math.abs(pad.axes[0]??0)>.2?(pad.axes[0]??0):frame.axis;frame.axis=buttons.has(14)?-1:buttons.has(15)?1:frame.axis;frame.down ||= buttons.has(13)||(pad.axes[1]??0)>.5;frame.block ||=buttons.has(4);frame.charge ||=buttons.has(5);
 const map:[number,Action][]=[[0,"jump"],[2,modifier?"special1":"light"],[3,modifier?"special2":"heavy"],[1,modifier?"special3":"weapon"],[7,"special1"]];
 for(const [n,a]of map)if(buttons.has(n)&&!prev.has(n))frame.pressed.push(a);
 if(buttons.has(9)&&!prev.has(9))this.edges.add("Escape");this.padPrevious[i]=buttons;}
 return frame;}) as [InputFrame,InputFrame];
 for(const b of this.bindings)for(const a of actions)this.edges.delete(b[a]);return result;}
 save():void{localStorage.setItem("shinobi-bindings",JSON.stringify(this.bindings));}
}
export const input=new InputManager();
