import Phaser from "phaser";
import {character} from "../characters/CharacterRegistry";
import {stages} from "../data/stages";
import {selection} from "./AppScenes";
import {Simulation} from "../systems/Simulation";
import {FixedClock} from "../systems/FixedClock";
import {input} from "../input/InputManager";
import {backdrop} from "../render/Backdrop";
import {FighterView} from "../render/FighterView";
import {button,on,screen,ui} from "../ui/UI";
import {CombatRenderer} from "../render/CombatRenderer";
import {neutralInput} from "../types";
export class BattleScene extends Phaser.Scene {
 sim!:Simulation;private clock=new FixedClock();private views:FighterView[]=[];private debug!:Phaser.GameObjects.Graphics;private boxes=false;private effects!:CombatRenderer;
 constructor(){super("Battle");}
 create():void{const stage=stages.find(s=>s.id===selection.stage)??stages[0];this.sim=new Simulation([character(selection.players[0]),character(selection.players[1])],stage,selection.mode,selection.roundSeconds);backdrop(this,stage.color);
 const g=this.add.graphics();g.fillStyle(0x1a242c).fillRect(0,stage.floor,1280,90);g.fillStyle(0x839585).fillRect(0,stage.floor,1280,6);for(const p of stage.platforms){g.fillStyle(0x26333c).fillRect(p.x,p.y,p.width,p.height);g.fillStyle(0xabb29a).fillRect(p.x,p.y,p.width,4);g.fillStyle(0x53676a).fillRect(p.x-7,p.y-4,p.width+14,4);}
 this.views=this.sim.fighters.map(f=>new FighterView(this,f));this.debug=this.add.graphics().setDepth(99);this.effects=new CombatRenderer(this);
 screen('<div class="hud">'+this.sim.fighters.map(f=>'<section><p class="eyebrow">PLAYER '+(f.id+1)+'</p><h3>'+f.definition.name+'</h3><div class="bar health"><i data-health="'+f.id+'"></i></div><div class="bar chakra"><i></i></div></section>').join('<div class="timer">99<small>ROUND 1</small></div>')+'</div><div class="battle-footer"><span>F LIGHT · G HEAVY · WASD MOVE · F3 BOXES</span>'+button("home","HOME")+'</div>');
 on("home",()=>this.scene.start("Home"));input.clear();this.clock.reset();
 this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>{this.views.forEach(v=>v.destroy());input.clear();});
 }
 update(_time:number,delta:number):void{if(input.shortcut("F3"))this.boxes=!this.boxes;if(input.shortcut("Escape")){this.sim.paused=!this.sim.paused;}
 this.clock.advance(delta,()=>{const frames=input.poll();if(selection.mode!=="versus")frames[1]=neutralInput();this.sim.step(frames);this.effects.effects(this.sim);});
 this.views.forEach(v=>v.update(this.sim.frame));this.effects.render(this.sim,this.boxes);for(const f of this.sim.fighters){const bar=ui.querySelector<HTMLElement>('[data-health="'+f.id+'"]');if(bar)bar.style.width=100*f.health/f.definition.maxHealth+"%";}this.debug.clear();if(this.boxes)for(const f of this.sim.fighters){const b=f.body;this.debug.lineStyle(2,0x55aaff).strokeRect(b.x,b.y,b.width,b.height);for(const h of f.hurtboxes)this.debug.lineStyle(1,0x44ff88).strokeRect(h.x,h.y,h.width,h.height);}
 ui.dataset.state=this.sim.paused?"paused":"battle";
 }
}
