export type Facing = 1 | -1;
export type Mode = "versus" | "training" | "arcade";
export type Action = "jump" | "light" | "heavy" | "weapon" | "special1" | "special2" | "special3";
export type AttackKey = "light1" | "light2" | "light3" | "heavy1" | "heavy2" | "heavy3" | "weapon" | "special1" | "special2" | "special3";
export type FighterState = "IDLE" | "RUN" | "JUMP" | "FALL" | "LAND" | "ATTACK" | "SPECIAL" | "THROW" | "BLOCK" | "PARRY" | "CHAKRA_CHARGE" | "HITSTUN" | "KNOCKDOWN" | "RECOVERY" | "KO";
export type Invulnerability = "full" | "strike" | "projectile";
export interface Rect { x:number; y:number; width:number; height:number }
export interface InputFrame { axis:number; down:boolean; block:boolean; charge:boolean; pressed:Action[] }
export const neutralInput = ():InputFrame => ({axis:0,down:false,block:false,charge:false,pressed:[]});
export interface HitboxFrame { startFrame:number; endFrame:number; offsetX:number; offsetY:number; width:number; height:number }
export type AttackEffect =
 | {kind:"projectile";speed:number;lifetime:number;width:number;height:number;gravity?:number;piercing?:boolean;ricochet?:number;boomerang?:boolean;maxAlive?:number;rehitDelay?:number}
 | {kind:"wall";width:number;height:number;hp:number;duration:number}
 | {kind:"dash";speed:number;frames:number}
 | {kind:"install";duration:number;meleeMultiplier:number;guardMultiplier:number}
 | {kind:"root";duration:number}
 | {kind:"bleed";duration:number;interval:number;damage:number};
export interface AttackDefinition {
 id:string;name:string;animation:string;startupFrames:number;activeFrames:number;recoveryFrames:number;
 damage:number;chakraCost:number;cooldown:number;hitstun:number;blockstun:number;knockbackX:number;knockbackY:number;hitstop:number;
 level:"mid"|"unblockable";damageType:"strike"|"projectile";knockdown?:boolean;hitboxes:HitboxFrame[];
 cancellableInto:AttackKey[];cancelWindow?:[number,number];effects?:AttackEffect[];
 invulnerability?:{startFrame:number;endFrame:number;type:Invulnerability};
 armor?:{startFrame:number;endFrame:number;damageMultiplier:number};
}
export interface CharacterDefinition {
 id:string;name:string;subtitle:string;description:string;quote:string;
 maxHealth:number;maxChakra:number;chipMultiplier:number;shield:boolean;parryRecovery:number;
 movement:{walkSpeed:number;runSpeed:number;jumpForce:number;airControl:number;gravityScale:number};
 ratings:{range:number;power:number;mobility:number;defense:number;chakra:number};
 palette:{body:number;accent:number;skin:number;hair:number};
 collision:{width:number;height:number};
 hurtboxes:{offsetX:number;offsetY:number;width:number;height:number;role?:"body"|"shield"}[];
 attacks:Record<AttackKey,AttackDefinition>;
}
export interface Platform extends Rect { oneWay:boolean }
export interface StageDefinition {id:string;name:string;subtitle:string;color:number;floor:number;width:number;platforms:Platform[];spawns:[number,number]}
export interface CombatEvent {type:"attack"|"hit"|"block"|"parry"|"charge"|"jump"|"land"|"ko"|"wall"|"install"|"round";x:number;y:number;power:number;owner:number;text?:string}
export interface TrainingOptions {infiniteHealth:boolean;infiniteChakra:boolean;dummy:"stand"|"block"|"jump"|"cpu"}
