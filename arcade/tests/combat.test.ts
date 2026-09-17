import test from "node:test";import assert from "node:assert/strict";
import {Simulation} from "../src/game/systems/Simulation";import y from "../src/game/data/characters/yokubari";import k from "../src/game/data/characters/kagari";import {stages} from "../src/game/data/stages";import {neutralInput,type Action} from "../src/game/types";
const setup=()=>{const s=new Simulation([y,k],stages[0]);s.fighters[0].x=500;s.fighters[1].x=560;return s;};
const tick=(s:Simulation,n=1,a:Action[]=[],b:Action[]=[])=>{for(let i=0;i<n;i++)s.step([{...neutralInput(),pressed:i===0?a:[]},{...neutralInput(),pressed:i===0?b:[]}]);};
test("startup is harmless and one press produces one light",()=>{const s=setup();tick(s,5,["light"]);assert.equal(s.fighters[1].health,1000);tick(s);assert.equal(s.fighters[1].health,965);tick(s,50);assert.equal(s.fighters[1].health,965);});
test("hitboxes mirror left",()=>{const s=setup();s.fighters[0].x=620;tick(s,6,["light"]);assert.equal(s.fighters[1].health,965);});
test("simultaneous attacks trade",()=>{const s=setup();tick(s,6,["light"],["light"]);assert.equal(s.fighters[0].health,1115);assert.equal(s.fighters[1].health,965);});
test("fresh presses buffer into the next combo step",()=>{const s=setup();tick(s,6,["light"]);tick(s,3);tick(s,6,["light"]);assert.equal(s.fighters[0].current?.key,"light2");});
test("heavy damage and hitstop are stronger",()=>{const s=setup();tick(s,11,["heavy"]);assert.equal(s.fighters[1].health,925);assert.equal(s.fighters[0].freeze,6);});
