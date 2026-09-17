import type {Action} from "../types";
export class InputBuffer {
 readonly entries:{action:Action;remaining:number}[]=[];
 push(action:Action,frames=8):void{this.entries.push({action,remaining:frames});if(this.entries.length>8)this.entries.shift();}
 tick():void{for(const x of this.entries)x.remaining--;for(let i=this.entries.length-1;i>=0;i--)if(this.entries[i].remaining<=0)this.entries.splice(i,1);}
 take(predicate:(action:Action)=>boolean):Action|undefined{const i=this.entries.findIndex(x=>predicate(x.action));return i<0?undefined:this.entries.splice(i,1)[0].action;}
 clear():void{this.entries.length=0;}
}
