import Phaser from "phaser";
import type {Simulation} from "../systems/Simulation";
import {activeHitboxes} from "../combat/CombatManager";
export class CombatRenderer {
 readonly graphics:Phaser.GameObjects.Graphics;private flashes:{x:number;y:number;life:number;power:number}[]=[];
 constructor(scene:Phaser.Scene){this.graphics=scene.add.graphics().setDepth(90);}
 effects(sim:Simulation):void{for(const e of sim.events)if(e.type==="hit"||e.type==="ko"||e.type==="block"||e.type==="parry")this.flashes.push({x:e.x,y:e.y,life:12,power:e.power});}
 render(sim:Simulation,boxes:boolean):void{const g=this.graphics;g.clear();
 for(const f of sim.fighters){const a=f.current;if(a){const active=a.frame>a.definition.startupFrames&&a.frame<=a.definition.startupFrames+a.definition.activeFrames;
 g.lineStyle(active?5:2,active?0xffcd87:0xc9baa1,active?.8:.25);if(active)g.beginPath().arc(f.x+f.facing*32,f.y-45,50,f.facing>0?-1.3:1.85,f.facing>0?1.3:4.45,false).strokePath();}
 if(boxes){const b=f.body;g.lineStyle(2,0x5588ff).strokeRect(b.x,b.y,b.width,b.height);for(const h of f.hurtboxes)g.lineStyle(1,0x44ff88).strokeRect(h.x,h.y,h.width,h.height);for(const h of activeHitboxes(f))g.lineStyle(2,0xff5555).strokeRect(h.x,h.y,h.width,h.height);}}
 for(const s of this.flashes){s.life--;const r=(12-s.life)*4;g.lineStyle(3,0xffda95,s.life/12);for(let i=0;i<8;i++){const a=i*Math.PI/4;g.lineBetween(s.x+Math.cos(a)*r/2,s.y+Math.sin(a)*r/2,s.x+Math.cos(a)*r,s.y+Math.sin(a)*r);}}
 this.flashes=this.flashes.filter(s=>s.life>0);
 }
}
