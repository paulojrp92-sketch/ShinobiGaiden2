import test from "node:test";
import assert from "node:assert/strict";
import { FixedClock } from "../src/game/systems/FixedClock";
test("60 logical frames regardless of display refresh rate",()=>{for(const hz of [30,60,144]){const clock=new FixedClock();let n=0;for(let i=0;i<hz;i++)clock.advance(1000/hz,()=>n++);assert.equal(n,60);}});
