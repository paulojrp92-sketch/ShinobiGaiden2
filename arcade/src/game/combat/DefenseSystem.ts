import type {Fighter} from "../characters/Fighter";
import type {AttackDefinition,CombatEvent} from "../types";
export interface DefenseSnapshot {blocking:boolean;parrying:boolean;invulnerable:boolean;armor:number}
export function defenseSnapshot(v:Fighter,sourceX:number,projectile:boolean):DefenseSnapshot {
 const current=v.current,inv=current?.definition.invulnerability,armor=current?.definition.armor;
 const frontal=(sourceX-v.x)*v.facing>=0;
 return {blocking:frontal&&v.state==="BLOCK",parrying:frontal&&v.state==="PARRY"&&v.fsm.frame>=3&&v.fsm.frame<=7,
 invulnerable:v.invulnerable>0||!!(inv&&current&&current.frame>=inv.startFrame&&current.frame<=inv.endFrame&&(inv.type==="full"||inv.type===(projectile?"projectile":"strike"))),
 armor:armor&&current&&current.frame>=armor.startFrame&&current.frame<=armor.endFrame?armor.damageMultiplier:1};
}
export function defend(a:Fighter,v:Fighter,d:AttackDefinition,direction:number,projectile:boolean,snapshot:DefenseSnapshot,events:CombatEvent[]):boolean {
 if(snapshot.invulnerable)return true;
 if(snapshot.parrying){
  a.current=null;a.stun=18;a.vx=v.facing*450;a.vy=-55;a.fsm.transition("HITSTUN");a.freeze=8;v.freeze=8;v.stun=0;v.blockstun=0;v.guard=Math.min(100,v.guard+12);v.fsm.transition(v.grounded?"IDLE":"FALL");
  events.push({type:"parry",x:v.x+v.facing*30,y:v.y-48,power:100,owner:v.id,text:"PARRY"});return true;
 }
 if(snapshot.blocking&&d.level!=="unblockable"){
  const chip=projectile&&v.definition.shield?0:Math.round(d.damage*v.definition.chipMultiplier);
  v.health=Math.max(0,v.health-chip);v.guard-=d.damage*.55/v.guardMultiplier;v.blockstun=d.blockstun;v.vx=direction*d.knockbackX*.28;v.freeze=d.hitstop;a.freeze=Math.max(a.freeze,d.hitstop);
  if(v.guard<=0){v.guard=35;v.blockstun=0;v.stun=45;v.fsm.transition("HITSTUN");}
  if(v.health===0)v.fsm.transition("KO");
  events.push({type:v.health===0?"ko":"block",x:v.x,y:v.y-48,power:d.damage,owner:v.id,text:v.stun>0?"GUARD BREAK":"BLOCK"});return true;
 }
 return false;
}
