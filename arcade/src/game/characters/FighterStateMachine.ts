import type {FighterState} from "../types";
export class FighterStateMachine {
 state:FighterState="IDLE";frame=0;
 transition(state:FighterState):void {if(this.state!==state){this.state=state;this.frame=0;}}
 tick():void{this.frame++;}
 get canMove():boolean{return ["IDLE","RUN","JUMP","FALL","LAND"].includes(this.state);}
}
