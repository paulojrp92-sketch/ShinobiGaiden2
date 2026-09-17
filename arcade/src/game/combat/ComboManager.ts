import type {Fighter} from "../characters/Fighter";
export class ComboManager {
 readonly scalingStep=.05;readonly minimumScale=.5;readonly recoveryGrace=12;
 scale(attacker:Fighter):number{return Math.max(this.minimumScale,1-attacker.comboHits*this.scalingStep);}
 register(attacker:Fighter,damage:number):void{attacker.comboHits++;attacker.comboDamage+=damage;attacker.comboGrace=this.recoveryGrace;}
 tick(fighters:[Fighter,Fighter]):void{for(const f of fighters){const victim=fighters[1-f.id];if(victim.stun>0||victim.freeze>0||victim.state==="KNOCKDOWN")continue;
 f.comboGrace=Math.max(0,f.comboGrace-1);if(f.comboGrace===0){f.comboHits=0;f.comboDamage=0;}}}
}
