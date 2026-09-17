import type {AttackDefinition,AttackKey,CharacterDefinition,Facing,Rect} from "../types";
import {FighterStateMachine} from "./FighterStateMachine";
import {InputBuffer} from "../input/InputBuffer";
export interface AttackInstance {definition:AttackDefinition;key:AttackKey;frame:number;id:number;hit:Set<number>;emitted:boolean}
export class Fighter {
 x:number;y:number;vx=0;vy=0;facing:Facing;grounded=true;platform=-1;coyote=6;jumpBuffer=0;dropFrames=0;
 health:number;chakra:number;guard=100;freeze=0;stun=0;blockstun=0;invulnerable=0;root=0;install=0;meleeMultiplier=1;guardMultiplier=1;knockdown=false;
 bleed=0;bleedInterval=0;bleedDamage=0;dashFrames=0;dashSpeed=0;
 readonly fsm=new FighterStateMachine();readonly buffer=new InputBuffer();readonly cooldowns:Record<string,number>={};
 current:AttackInstance|null=null;lastAttack:AttackKey|null=null;chainGrace=0;sequence=0;flash=0;
 comboHits=0;comboDamage=0;comboGrace=0;
 constructor(readonly id:number,readonly definition:CharacterDefinition,x:number,y:number){this.x=x;this.y=y;this.facing=id===0?1:-1;this.health=definition.maxHealth;this.chakra=definition.maxChakra;}
 get state(){return this.fsm.state;}
 get body():Rect{return {x:this.x-this.definition.collision.width/2,y:this.y-this.definition.collision.height,width:this.definition.collision.width,height:this.definition.collision.height};}
 get hurtboxes():Rect[]{return this.definition.hurtboxes.filter(b=>b.role!=="shield"||this.state==="BLOCK").map(b=>({x:this.x+b.offsetX*this.facing-b.width/2,y:this.y+b.offsetY-b.height/2,width:b.width,height:b.height}));}
}
