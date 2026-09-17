import Phaser from "phaser";
import {characters,character} from "../characters/CharacterRegistry";
import {stages} from "../data/stages";
import {backdrop} from "../render/Backdrop";
import {makeFighterTexture} from "../render/FighterView";
import {button,heading,on,screen,ui} from "../ui/UI";
import type {Mode} from "../types";
export const selection={mode:"versus" as Mode,players:[characters[0].id,characters[1].id] as [string,string],stage:stages[0].id,roundSeconds:99};
export class BootScene extends Phaser.Scene{constructor(){super("Boot");}create():void{this.scene.start("Preload");}}
export class PreloadScene extends Phaser.Scene{constructor(){super("Preload");}create():void{for(const c of characters)makeFighterTexture(this,c);this.scene.start("Home");}}
export class HomeScene extends Phaser.Scene{
 constructor(){super("Home");}
 create():void{backdrop(this);this.add.rectangle(250,360,670,720,0x090f19,.62);
 screen('<section class="home"><p class="eyebrow">ORIGINAL NINJA PLATFORM FIGHTER · VOL. 01</p><h1>SHINOBI<br>GAIDEN<span>ARCADE</span></h1><p class="home-copy">HOLD YOUR GROUND.<br>MAKE YOUR OPENING.</p><nav>'+button("versus","01 &nbsp; VERSUS <span>LOCAL / 2 PLAYERS</span>")+button("training","02 &nbsp; TRAINING <span>MASTER YOUR TECHNIQUE</span>")+button("arcade","03 &nbsp; ARCADE <span>VS CPU</span>")+'</nav><p class="home-meta">60 FPS COMBAT · KEYBOARD + GAMEPAD</p></section><aside class="home-aside"><span class="seal">忍</span><p>THE SHIELD<br>&amp; THE SPARK</p><small>YOKUBARI SENJU × KAGARI</small></aside><footer>SHINOBI GAIDEN ARCADE <span>WORK IN PROGRESS / 02</span></footer>');
 for(const mode of ["versus","training","arcade"] as Mode[])on(mode,()=>{selection.mode=mode;this.scene.start("CharacterSelect");});
 }
}
export class CharacterSelectScene extends Phaser.Scene{
 private picks=[0,1];private ready=[false,false];
 constructor(){super("CharacterSelect");}
 create():void{this.picks=[Math.max(0,characters.findIndex(c=>c.id===selection.players[0])),Math.max(0,characters.findIndex(c=>c.id===selection.players[1]))];this.ready=[false,selection.mode!=="versus"];backdrop(this);this.render();}
 private render():void{screen(heading("CHOOSE YOUR FIGHTER",selection.mode.toUpperCase())+'<div class="select-layout">'+[0,1].map(i=>{const c=characters[this.picks[i]];return '<section class="fighter-panel"><p class="eyebrow">PLAYER '+(i+1)+(i===1&&selection.mode!=="versus"?" / "+(selection.mode==="training"?"DUMMY":"CPU"):"")+'</p><div id="portrait'+i+'" class="portrait"></div><h3>'+c.name+'</h3><p class="subtitle">'+c.subtitle+'</p><p class="description">'+c.description+'</p><div class="ratings">'+Object.entries(c.ratings).map(([k,v])=>'<div>'+k.toUpperCase()+'<span>'+"★".repeat(v)+"☆".repeat(5-v)+'</span></div>').join("")+'</div><div class="roster">'+characters.map((x,n)=>button("pick"+i+"-"+n,x.name.split(" ")[0],this.picks[i]===n?"selected":"")).join("")+'</div>'+button("ready"+i,this.ready[i]?"READY ✓":"LOCK IN")+'</section>';}).join("")+'</div><div class="screen-bottom">'+button("back","← HOME")+button("next","SELECT ARENA →",this.ready.every(Boolean)?"primary":"disabled")+'</div>');
 for(let i=0;i<2;i++){const c=characters[this.picks[i]];const source=this.textures.get("fighter-"+c.id).getSourceImage() as HTMLCanvasElement;const canvas=document.createElement("canvas");canvas.width=136;canvas.height=168;const ctx=canvas.getContext("2d")!;ctx.imageSmoothingEnabled=false;ctx.drawImage(source,0,0,136,168);ui.querySelector("#portrait"+i)?.append(canvas);
 characters.forEach((_,n)=>on("pick"+i+"-"+n,()=>{this.picks[i]=n;this.ready[i]=false;this.render();}));on("ready"+i,()=>{this.ready[i]=!this.ready[i];this.render();});}
 on("next",()=>{if(this.ready.every(Boolean)){selection.players=[characters[this.picks[0]].id,characters[this.picks[1]].id];this.scene.start("StageSelect");}});on("back",()=>this.scene.start("Home"));}
}
export class StageSelectScene extends Phaser.Scene{
 constructor(){super("StageSelect");}
 create():void{backdrop(this);screen(heading("SET THE STAGE","CHOOSE YOUR ARENA")+'<div class="stages">'+stages.map((s,i)=>'<section class="stage-card"><div class="stage-illustration stage-'+i+'"><i></i><i></i><i></i></div><p class="eyebrow">ARENA 0'+(i+1)+'</p><h3>'+s.name+'</h3><p>'+s.subtitle+'</p>'+button(s.id,"FIGHT HERE →","primary")+'</section>').join("")+'</div><div class="screen-bottom">'+button("back","← FIGHTERS")+'</div>');for(const s of stages)on(s.id,()=>{selection.stage=s.id;this.scene.start("Battle");});on("back",()=>this.scene.start("CharacterSelect"));}
}
export function selectedCharacters(){return [character(selection.players[0]),character(selection.players[1])] as const;}
