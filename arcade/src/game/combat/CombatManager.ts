import type {AttackDefinition,CombatEvent,Rect} from "../types";
import type {Fighter} from "../characters/Fighter";
import {overlaps} from "../utils/geometry";
import {defend,defenseSnapshot,type DefenseSnapshot} from "./DefenseSystem";
import {ComboManager} from "./ComboManager";
export interface Contact {attacker:Fighter;victim:Fighter;attack:AttackDefinition;direction:number;sourceX:number;projectile:boolean;defense:DefenseSnapshot}
export function activeHitboxes(f:Fighter):Rect[]{
 const a=f.current;if(!a||f.freeze>0)return [];
 return a.definition.hitboxes.filter(h=>a.frame>=h.startFrame&&a.frame<=h.endFrame).map(h=>({x:f.x+h.offsetX*f.facing-h.width/2,y:f.y+h.offsetY-h.height/2,width:h.width,height:h.height}));
}
export class CombatManager {
 readonly combos=new ComboManager();
 /** Detect all contacts before applying any. Simultaneous attacks can trade. */
 resolve(fighters:[Fighter,Fighter],events:CombatEvent[]):void {
 const contacts:Contact[]=[];
 for(const attacker of fighters){const victim=fighters[1-attacker.id],a=attacker.current;if(!a||a.hit.has(victim.id)||victim.health<=0||victim.invulnerable>0)continue;
 if(activeHitboxes(attacker).some(h=>victim.hurtboxes.some(b=>overlaps(h,b)))){a.hit.add(victim.id);contacts.push({attacker,victim,attack:a.definition,direction:attacker.facing,sourceX:attacker.x,projectile:false,defense:defenseSnapshot(victim,attacker.x,false)});}}
 for(const contact of contacts)this.apply(contact,events);
 }
 apply(c:Contact,events:CombatEvent[]):void{
 const {attacker:a,victim:v,attack:d}=c;
 if(defend(a,v,d,c.direction,c.projectile,c.defense,events))return;
 const damage=Math.round(d.damage*c.defense.armor*this.combos.scale(a)*(c.projectile?1:a.meleeMultiplier));
 v.health=Math.max(0,v.health-damage);if(c.defense.armor===1){v.stun=d.hitstun;v.current=null;}v.flash=8;v.vx=d.knockbackX*c.direction;v.vy=d.knockbackY;if(v.vy<0)v.grounded=false;
 if(c.defense.armor===1){v.knockdown=!!d.knockdown;v.fsm.transition(v.health===0?"KO":"HITSTUN");}else if(v.health===0)v.fsm.transition("KO");a.freeze=Math.max(a.freeze,d.hitstop);v.freeze=Math.max(v.freeze,d.hitstop);this.combos.register(a,damage);
 events.push({type:v.health===0?"ko":"hit",x:v.x,y:v.y-48,power:d.damage,owner:a.id,text:String(damage)});
 }
}
