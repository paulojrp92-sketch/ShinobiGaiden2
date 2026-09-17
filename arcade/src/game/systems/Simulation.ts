import type {CharacterDefinition,CombatEvent,InputFrame,Mode,StageDefinition,TrainingOptions} from "../types";
import {Fighter} from "../characters/Fighter";
import {tickFighter} from "../characters/FighterController";
import {moveFighter} from "./MovementSystem";
import {CombatManager} from "../combat/CombatManager";
import {overlaps} from "../utils/geometry";
export class Simulation {
 readonly fighters:[Fighter,Fighter];readonly combat=new CombatManager();frame=0;events:CombatEvent[]=[];paused=false;
 readonly training:TrainingOptions={infiniteHealth:true,infiniteChakra:true,dummy:"stand"};
 constructor(readonly definitions:[CharacterDefinition,CharacterDefinition],readonly stage:StageDefinition,readonly mode:Mode="versus",readonly roundSeconds=99){this.fighters=[new Fighter(0,definitions[0],stage.spawns[0],stage.floor),new Fighter(1,definitions[1],stage.spawns[1],stage.floor)];}
 step(inputs:[InputFrame,InputFrame]):void{if(this.paused)return;this.frame++;this.events.length=0;this.combat.combos.tick(this.fighters);
  for(const f of this.fighters){const frozen=f.freeze>0,other=this.fighters[1-f.id];tickFighter(f,other,inputs[f.id],this.events);if(!frozen){const ground=f.grounded;moveFighter(f,inputs[f.id],this.stage);if(ground&&!f.grounded&&f.vy<0)this.events.push({type:"jump",x:f.x,y:f.y,power:0,owner:f.id});if(!ground&&f.grounded)this.events.push({type:"land",x:f.x,y:f.y,power:0,owner:f.id});}}
  const [a,b]=this.fighters;if(overlaps(a.body,b.body)){const sign=a.x<=b.x?1:-1,penetration=(a.definition.collision.width+b.definition.collision.width)/2-Math.abs(a.x-b.x);a.x-=sign*penetration/2;b.x+=sign*penetration/2;}
  this.combat.resolve(this.fighters,this.events);
 }
 reset():void{for(let i=0;i<2;i++)this.fighters[i]=new Fighter(i,this.definitions[i],this.stage.spawns[i],this.stage.floor);}
}
