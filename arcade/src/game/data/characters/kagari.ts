import type {CharacterDefinition} from "../../types";
import {attack,chain} from "../attacks/factory";
const light=chain("kagari",["Quick Palm","Crescent Kick","Ember Finish"],false,[35,40,60]);
const heavy=chain("kagari",["Ridge Strike","Turning Heel","Falling Comet"],true,[60,70,100]);
export default {
 id:"kagari",name:"KAGARI",subtitle:"BALANCED NINJA / EMBER STYLE",description:"A quick-footed all-rounder. Control the middle distance with precise strikes, a piercing spark, and a sudden dash.",
 quote:"A moment is all I need.",maxHealth:1000,maxChakra:100,chipMultiplier:.2,shield:false,parryRecovery:18,
 movement:{walkSpeed:185,runSpeed:345,jumpForce:695,airControl:.9,gravityScale:1},
 ratings:{range:4,power:3,mobility:5,defense:3,chakra:4},palette:{body:0x414775,accent:0xe9a34b,skin:0xcc9776,hair:0x1b1d30},
 collision:{width:34,height:82},hurtboxes:[{offsetX:0,offsetY:-60,width:30,height:40},{offsetX:0,offsetY:-22,width:32,height:42}],
 attacks:{
 light1:light[0],light2:light[1],light3:light[2],heavy1:heavy[0],heavy2:heavy[1],heavy3:heavy[2],
 weapon:attack("kagari-weapon","Ember Kunai",32,10,1,16,{cooldown:48,hitboxes:[],damageType:"projectile",effects:[{kind:"projectile",speed:760,lifetime:95,width:24,height:10,maxAlive:2}]}),
 special1:attack("kagari-burst","Chakra Burst",95,9,5,21,{chakraCost:20,cooldown:180,hitstun:28,hitstop:7,knockbackX:300,hitboxes:[{startFrame:10,endFrame:14,offsetX:49,offsetY:-44,width:90,height:70}]}),
 special2:attack("kagari-spark","Needle of Dawn",80,13,1,22,{chakraCost:30,cooldown:360,hitboxes:[],damageType:"projectile",hitstop:6,effects:[{kind:"projectile",speed:1000,lifetime:75,width:45,height:24,maxAlive:1}]}),
 special3:attack("kagari-dash","Falling Sun",145,14,12,26,{chakraCost:50,cooldown:600,hitstun:40,hitstop:9,knockbackX:460,knockbackY:-240,knockdown:true,invulnerability:{startFrame:15,endFrame:22,type:"projectile"},effects:[{kind:"dash",speed:810,frames:12}],hitboxes:[{startFrame:15,endFrame:26,offsetX:43,offsetY:-44,width:80,height:70}]})
 }
} satisfies CharacterDefinition;
