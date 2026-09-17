import type {CharacterDefinition} from "../types";
/** Adding a default-exported character module is enough to extend the roster. */
const modules=import.meta.glob<{default:CharacterDefinition}>("../data/characters/*.ts",{eager:true});
export const characters:CharacterDefinition[]=Object.values(modules).map(m=>m.default).sort((a,b)=>Number(b.shield)-Number(a.shield));
export function character(id:string):CharacterDefinition { const found=characters.find(c=>c.id===id);if(!found)throw new Error("Unknown fighter: "+id);return found; }
