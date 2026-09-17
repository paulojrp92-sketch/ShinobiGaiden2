import {test,expect} from "@playwright/test";
test("home, roster, stage, movement, and debug overlay",async({page})=>{
 const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/");await page.getByRole("button",{name:/02.*TRAINING/}).click();
 await page.locator("#ready0").click();await page.locator("#next").click();await page.locator("#moonlit").click();
 await expect(page.locator("#ui")).toHaveAttribute("data-state","battle");
 await page.keyboard.press("F3");await page.keyboard.down("KeyD");await page.waitForTimeout(250);await page.keyboard.up("KeyD");await page.keyboard.press("KeyW");await page.waitForTimeout(160);
 await page.screenshot({path:"test-results/arena.png"});expect(errors).toEqual([]);
});
