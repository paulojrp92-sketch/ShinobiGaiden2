import Phaser from "phaser";
export function backdrop(scene:Phaser.Scene,color=0x172434):Phaser.GameObjects.Graphics{
 const g=scene.add.graphics();g.fillStyle(color).fillRect(-640,-360,2560,1440);
 g.fillStyle(0xa8bbb9,.12).fillRect(0,210,1280,2);g.fillStyle(0xd7d4b8,.9).fillCircle(1010,154,63);g.fillStyle(color,.25).fillCircle(1035,131,58);
 for(let i=0;i<62;i++){const x=(i*173+79)%1280,y=(i*91)%265;g.fillStyle(0xd6dcce,i%3===0?.75:.25).fillRect(x,y,2,2);}
 for(let layer=0;layer<3;layer++){for(let i=0;i<10;i++){const x=i*155-70+layer*38,h=80+(i*47+layer*59)%100,y=485+layer*49-h;
 g.fillStyle([0x172b38,0x182d36,0x13252e][layer]).fillRect(x,y,125,h+200);
 g.fillStyle([0x101d2b,0x172331,0x0d1c25][layer]).fillPoints([{x:x-20,y:y+6},{x:x+62,y:y-31},{x:x+145,y:y+6}],true);
 for(let w=0;w<3;w++)for(let r=0;r<2;r++){g.fillStyle((i+w+r)%3?0xaa7045:0x3a4b47,.55).fillRect(x+18+w*31,y+22+r*35,12,17);}}}
 g.fillStyle(0x72938c,.08).fillRect(0,520,1280,60);return g;
}
