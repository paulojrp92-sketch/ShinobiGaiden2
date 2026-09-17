import type {CharacterDefinition,CombatEvent,InputFrame,Mode,StageDefinition,TrainingOptions} from "../types";
import {Fighter} from "../characters/Fighter";
import {moveFighter} from "./MovementSystem";
export class Simulation {
 readonly fighters:[Fighter,Fighter];frame=0;events:CombatEvent[]=[];paused=false;
 readonly training:TrainingOptions={infiniteHealth:true,infiniteChakra:true,dummy:"stand"};
 constructor(readonly definitions:[CharacterDefinition,CharacterDefinition],readonly stage:StageDefinition,readonly mode:Mode="versus",readonly roundSeconds=99){this.fighters=[new Fighter(0,definitions[0],stage.spawns[0],stage.floor),new Fighter(1,definitions[1],stage.spawns[1],stage.floor)];}
 step(inputs:[InputFrame,InputFrame]):void{if(this.paused)return;this.frame++;this.events.length=0;
  for(const f of this.fighters){const other=this.fighters[1-f.id];if(f.fsm.canMove)f.facing=other.x>=f.x?1:-1;f.fsm.tick();moveFighter(f,inputs[f.id],this.stage);}
 }
 reset():void{for(let i=0;i<2;i++)this.fighters[i]=new Fighter(i,this.definitions[i],this.stage.spawns[i],this.stage.floor);}
}
