import Phaser from "phaser";
import "./style.css";
class Home extends Phaser.Scene {
  constructor() { super("Home"); }
  create(): void {
    this.add.rectangle(640, 360, 1280, 720, 0x111724);
    this.add.circle(990, 165, 86, 0xcfcbb8);
    const ui = document.querySelector<HTMLDivElement>("#ui");
    if (ui) ui.innerHTML = '<section class="home"><p class="eyebrow">THE SHIELD. THE SPARK. THE SHOWDOWN.</p><h1>SHINOBI<br>GAIDEN<span>ARCADE</span></h1><p>Foundation checkpoint</p><p>Combat restoration in progress.</p></section>';
  }
}
const game = new Phaser.Game({ type: Phaser.AUTO, parent:"game", width:1280, height:720, pixelArt:true, antialias:false, roundPixels:true, backgroundColor:"#10131f", scale:{mode:Phaser.Scale.FIT, autoCenter:Phaser.Scale.CENTER_BOTH}, scene:[Home] });
function resize(): void { const shell=document.querySelector<HTMLElement>("#game-shell"); if(shell){const s=Math.min(innerWidth/1280,innerHeight/720);shell.style.width=1280*s+"px";shell.style.height=720*s+"px"; const ui=document.querySelector<HTMLElement>("#ui"); if(ui)ui.style.transform="scale("+s+")";}}
addEventListener("resize",resize);resize();
Object.assign(window,{shinobiGame:game});
