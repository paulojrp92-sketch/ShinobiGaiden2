import Phaser from "phaser";
import "./style.css";
import {BootScene,PreloadScene,HomeScene,CharacterSelectScene,StageSelectScene} from "./game/scenes/AppScenes";
import {BattleScene} from "./game/scenes/BattleScene";
new Phaser.Game({type:Phaser.AUTO,parent:"game",width:1280,height:720,pixelArt:true,antialias:false,roundPixels:true,backgroundColor:"#10131f",scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[BootScene,PreloadScene,HomeScene,CharacterSelectScene,StageSelectScene,BattleScene]});
function resize():void{const shell=document.querySelector<HTMLElement>("#game-shell");const ui=document.querySelector<HTMLElement>("#ui");if(shell&&ui){const s=Math.min(innerWidth/1280,innerHeight/720);shell.style.width=1280*s+"px";shell.style.height=720*s+"px";ui.style.transform="scale("+s+")";}}
addEventListener("resize",resize);resize();
