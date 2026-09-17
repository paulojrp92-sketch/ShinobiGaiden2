import type { AttackDefinition,AttackKey } from "../../types";
export const totalFrames=(a:AttackDefinition):number=>a.startupFrames+a.activeFrames+a.recoveryFrames;
export function attack(id:string,name:string,damage:number,startupFrames:number,activeFrames:number,recoveryFrames:number,patch:Partial<AttackDefinition>={}):AttackDefinition {
 return {id,name,animation:id,startupFrames,activeFrames,recoveryFrames,damage,chakraCost:0,cooldown:0,hitstun:18,blockstun:9,knockbackX:100,knockbackY:0,hitstop:3,level:"mid",damageType:"strike",hitboxes:[{startFrame:startupFrames+1,endFrame:startupFrames+activeFrames,offsetX:43,offsetY:-46,width:60,height:40}],cancellableInto:[],...patch};
}
export function chain(id:string,names:[string,string,string],heavy:boolean,damage:[number,number,number]):[AttackDefinition,AttackDefinition,AttackDefinition] {
 const group=heavy?"heavy":"light";const starts=heavy?[10,11,15]:[5,4,7];const active=heavy?[4,4,5]:[3,3,4];const recovery=heavy?[13,14,22]:[7,8,14];
 return names.map((name,i)=>attack(id+"-"+group+(i+1),name,damage[i],starts[i],active[i],recovery[i],{hitstun:heavy?32:18,blockstun:heavy?15:7,hitstop:heavy?6:3,knockbackX:i===2?(heavy?390:240):70,knockbackY:i===2?-100:0,knockdown:heavy&&i===2,cancellableInto:i<2?[(group+(i+2)) as AttackKey]:[],cancelWindow:[starts[i]+active[i],starts[i]+active[i]+recovery[i]]})) as [AttackDefinition,AttackDefinition,AttackDefinition];
}
