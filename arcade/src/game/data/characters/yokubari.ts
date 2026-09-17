import type {CharacterDefinition} from "../../types";
import {attack,chain} from "../attacks/factory";
const light=chain("yokubari",["Shield Jab","Body Check","Kunai Rip"],false,[35,45,65]);
light[2].effects=[{kind:"bleed",duration:180,interval:30,damage:3}];
const heavy=chain("yokubari",["Senju Hook","Rising Tate","Chakra Breaker"],true,[75,85,120]);
heavy[1].knockbackY=-390;heavy[1].hitstun=40;heavy[2].knockdown=true;
export default {
 id:"yokubari",name:"YOKUBARI SENJU",subtitle:"COUNTER-BRUISER / DEFENSIVE VANGUARD",
 description:"Strong ground movement. A relentless shield. Turn one perfect defense into devastating close-range pressure.",
 quote:"Go on. Make the first move.",maxHealth:1150,maxChakra:100,chipMultiplier:.12,shield:true,parryRecovery:22,
 movement:{walkSpeed:190,runSpeed:365,jumpForce:650,airControl:.78,gravityScale:1},
 ratings:{range:2,power:5,mobility:4,defense:5,chakra:4},palette:{body:0x315a4c,accent:0xdd594e,skin:0xd3a380,hair:0xe0d8c4},
 collision:{width:36,height:86},hurtboxes:[{offsetX:0,offsetY:-63,width:32,height:40},{offsetX:0,offsetY:-23,width:34,height:42},{offsetX:25,offsetY:-48,width:18,height:50,role:"shield"}],
 attacks:{
 light1:light[0],light2:light[1],light3:light[2],heavy1:heavy[0],heavy2:heavy[1],heavy3:heavy[2],
 weapon:attack("yokubari-kunai","Kunai Toss",45,13,1,18,{cooldown:72,damageType:"projectile",hitboxes:[],knockbackX:140,effects:[{kind:"projectile",speed:820,lifetime:90,width:26,height:10,maxAlive:1},{kind:"bleed",duration:180,interval:30,damage:3}]}),
 special1:attack("yokubari-wall","Doryūheki",0,16,1,22,{chakraCost:15,cooldown:420,hitboxes:[],effects:[{kind:"wall",width:58,height:154,hp:220,duration:240}]}),
 special2:attack("yokubari-link","Sōtaishiki",20,18,4,25,{chakraCost:30,cooldown:540,knockbackX:0,hitstun:5,hitboxes:[{startFrame:19,endFrame:22,offsetX:39,offsetY:-47,width:40,height:46}],effects:[{kind:"root",duration:75}]}),
 special3:attack("yokubari-byakugo","Byakugō: Hishō no Tate",125,26,1,28,{chakraCost:50,cooldown:900,hitstop:10,hitstun:35,knockbackX:340,knockbackY:-190,damageType:"projectile",hitboxes:[],armor:{startFrame:8,endFrame:20,damageMultiplier:.55},effects:[{kind:"install",duration:420,meleeMultiplier:1.15,guardMultiplier:1.2},{kind:"projectile",speed:580,lifetime:110,width:92,height:88,boomerang:true,piercing:true,rehitDelay:28,maxAlive:1}]})
 }
} satisfies CharacterDefinition;
