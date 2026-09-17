import type {Action,AttackKey,CombatEvent,InputFrame} from "../types";
import {totalFrames} from "../data/attacks/factory";
import type {Fighter} from "./Fighter";
export function attackKey(f:Fighter,action:Action):AttackKey|undefined{
 if(action!=="light"&&action!=="heavy")return undefined;
 const previous=f.current?.key??(f.chainGrace>0?f.lastAttack:null);
 if(previous?.startsWith(action)){const n=Number(previous.slice(-1));if(n<3)return (action+(n+1)) as AttackKey;}
 return (action+"1") as AttackKey;
}
export function startAttack(f:Fighter,key:AttackKey,events:CombatEvent[]):void {
 const definition=f.definition.attacks[key];
 f.current={definition,key,frame:1,id:++f.sequence,hit:new Set(),emitted:false};f.vx=0;
 f.fsm.transition(key.startsWith("special")?"SPECIAL":key==="weapon"?"THROW":"ATTACK");
 events.push({type:"attack",x:f.x,y:f.y-48,power:definition.damage,owner:f.id,text:definition.name});
}
export function tickFighter(f:Fighter,opponent:Fighter,input:InputFrame,events:CombatEvent[]):void {
 f.buffer.tick();for(const action of input.pressed)if(action!=="jump")f.buffer.push(action);
 if(f.freeze>0){f.freeze--;return;}
 f.flash=Math.max(0,f.flash-1);f.fsm.tick();f.chainGrace=Math.max(0,f.chainGrace-1);f.invulnerable=Math.max(0,f.invulnerable-1);
 if(f.health<=0){f.fsm.transition("KO");return;}
 if(f.stun>0){f.stun--;if(f.stun===0)f.fsm.transition(f.grounded?"IDLE":"FALL");else return;}
 if(f.current){f.current.frame++;if(f.current.frame>totalFrames(f.current.definition)){f.lastAttack=f.current.key;f.chainGrace=12;f.current=null;f.fsm.transition(f.grounded?"IDLE":"FALL");}}
 if(f.fsm.canMove)f.facing=opponent.x>=f.x?1:-1;
 const action=f.buffer.take(a=>{const key=attackKey(f,a);if(!key)return false;
 if(f.current){const attack=f.current.definition,w=attack.cancelWindow;return !!w&&f.current.frame>=w[0]&&f.current.frame<=w[1]&&attack.cancellableInto.includes(key);}
 return f.fsm.canMove;
 });
 if(action){const key=attackKey(f,action);if(key)startAttack(f,key,events);}
}
