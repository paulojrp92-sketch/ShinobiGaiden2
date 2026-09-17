import Phaser from "phaser";
import type {CharacterDefinition} from "../types";
import type {Fighter} from "../characters/Fighter";
/** Original replaceable 32x40 pixel poses; hitboxes never depend on these pixels. */
export function makeFighterTexture(scene:Phaser.Scene,c:CharacterDefinition):string{
 const key="fighter-"+c.id;if(scene.textures.exists(key))return key;
 const g=scene.make.graphics({x:0,y:0});
 const rect=(color:number,x:number,y:number,w:number,h:number)=>g.fillStyle(color).fillRect(x,y,w,h);
 rect(0x111721,10,6,14,13);rect(c.palette.skin,13,8,11,9);rect(c.palette.hair,10,3,15,7);rect(c.palette.accent,10,8,15,3);
 rect(0x111721,21,12,3,2);rect(c.palette.body,8,18,16,15);rect(c.palette.accent,7,19,19,3);rect(0x101926,10,31,6,8);rect(0x101926,19,30,6,9);
 rect(0x858e82,8,38,9,2);rect(0x858e82,19,38,9,2);rect(c.palette.skin,23,22,5,9);rect(c.palette.body,5,21,6,11);rect(c.palette.accent,8,30,16,3);
 if(c.shield){rect(0x172422,23,18,9,17);rect(0xa7ac95,24,19,7,15);rect(0x394945,26,21,3,11);rect(c.palette.accent,25,25,5,3);}
 else{rect(c.palette.accent,3,16,9,4);rect(c.palette.accent,0,19,8,3);}
 g.generateTexture(key,34,42);g.destroy();return key;
}
export class FighterView {
 readonly sprite:Phaser.GameObjects.Image;readonly shadow:Phaser.GameObjects.Ellipse;readonly aura:Phaser.GameObjects.Ellipse;
 constructor(scene:Phaser.Scene,readonly fighter:Fighter){this.aura=scene.add.ellipse(0,0,100,150,0xe85652,.1);this.shadow=scene.add.ellipse(0,0,65,12,0x050a10,.45);this.sprite=scene.add.image(0,0,makeFighterTexture(scene,fighter.definition)).setOrigin(.5,1).setScale(2.5);}
 update(frame:number):void{const f=this.fighter;const bob=f.state==="IDLE"?Math.floor(Math.sin(frame/14)*1.6):0;
 this.sprite.setPosition(Math.round(f.x),Math.round(f.y+bob)).setFlipX(f.facing<0).setAlpha(f.invulnerable>0&&frame%6<3?.45:1);
 this.sprite.setTint(f.flash>0?0xffe7d0:0xffffff);this.sprite.setAngle(f.state==="RUN"?f.facing*7:f.state==="HITSTUN"?-f.facing*15:0);
 this.shadow.setPosition(f.x,f.y+1).setAlpha(f.grounded?.45:.18);
 this.aura.setPosition(f.x,f.y-48).setFillStyle(f.install>0?0xee433a:0x52e6d4,.15+.08*Math.sin(frame*.5)).setVisible(f.install>0||f.state==="CHAKRA_CHARGE");
 }
 destroy():void{this.sprite.destroy();this.shadow.destroy();this.aura.destroy();}
}
