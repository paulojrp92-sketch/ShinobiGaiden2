import type {InputFrame,StageDefinition} from "../types";
import type {Fighter} from "../characters/Fighter";
export function moveFighter(f:Fighter,input:InputFrame,stage:StageDefinition):void {
 if(input.pressed.includes("jump"))f.jumpBuffer=6;
 else f.jumpBuffer=Math.max(0,f.jumpBuffer-1);
 f.dropFrames=Math.max(0,f.dropFrames-1);
 if(f.grounded)f.coyote=6;else f.coyote=Math.max(0,f.coyote-1);
 if(f.fsm.canMove&&f.root===0){
  if(f.jumpBuffer>0&&(f.grounded||f.coyote>0)){
   if(input.down&&f.platform>=0&&stage.platforms[f.platform].oneWay){f.dropFrames=12;f.y+=4;f.vy=40;}
   else f.vy=-f.definition.movement.jumpForce;
   f.grounded=false;f.coyote=0;f.jumpBuffer=0;f.platform=-1;f.fsm.transition("JUMP");
  }
  const target=input.axis*f.definition.movement.runSpeed;
  const control=f.grounded?1:f.definition.movement.airControl;
  f.vx+=(target-f.vx)*control;
 }else if(f.state!=="HITSTUN"&&f.state!=="KO")f.vx*=.72;
 if(f.dashFrames>0){f.vx=f.dashSpeed*f.facing;f.dashFrames--;}
 if(f.root>0){f.vx=0;f.vy=0;return;}
 const previousY=f.y;f.x+=f.vx/60;f.vy+=1600*f.definition.movement.gravityScale/60;f.y+=f.vy/60;
 f.x=Math.max(22,Math.min(stage.width-22,f.x));f.grounded=false;f.platform=-1;
 if(f.vy>=0){
  for(let i=0;i<stage.platforms.length;i++){const p=stage.platforms[i];if(f.dropFrames>0&&p.oneWay)continue;
   if(previousY<=p.y+1&&f.y>=p.y&&f.x+16>p.x&&f.x-16<p.x+p.width){f.y=p.y;f.vy=0;f.grounded=true;f.platform=i;break;}
  }
 }
 for(const p of stage.platforms.filter(p=>!p.oneWay)){
  const b=f.body;if(b.x<p.x+p.width&&b.x+b.width>p.x&&b.y<p.y+p.height&&b.y+b.height>p.y){
   if(f.vy<0&&previousY-f.definition.collision.height>=p.y+p.height){f.y=p.y+p.height+f.definition.collision.height;f.vy=0;}
   else if(f.x<p.x+p.width/2)f.x=p.x-18;else f.x=p.x+p.width+18;
  }
 }
 if(f.y>=stage.floor){f.y=stage.floor;f.vy=0;f.grounded=true;f.platform=-1;}
 if(f.fsm.canMove)f.fsm.transition(f.grounded?(Math.abs(f.vx)>20?"RUN":"IDLE"):(f.vy<0?"JUMP":"FALL"));
}
