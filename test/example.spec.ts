import {test, expect} from '@playwright/test'

import {loadHomepage, assertTitle} from "../helpers"

//wtf is this method/class formatting lmao
test("Simple test.", async ( {page}) =>
{
    //this is where test code goes
    await page.goto("https://www.example.com")
    const pageTitle = await page.locator("h1")
    await expect(pageTitle).toContainText("Example Domain")
})

test("Clicking on elements", async ({ page }) =>
{
    await page.goto("http://zero.webappsecurity.com/index.html")
    await page.click("#signin_button")
    await page.click("text=Sign in")

    const errorMessage = await page.locator(".alert-error")
    await expect(errorMessage).toContainText("Login and/or password are wrong.")
})

test.skip("Selectors", async ({page}) =>
{
    //text
    await page.click("text=some text")

    //css selectors
    await page.click("button")
    await page.click("#id")
    await page.click(".class")

    //only visible css selector
    await page.click(".submit-button:visible")

    //combinations
    await page.click("#username .first")

    //xpath
    await page.click("//button") //any valid xpath
}) 

test.describe("My first test suite", () => 
{
    
        test("Working with inputs @myTag", async ({page}) =>
    {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#signin_button")

        await page.type("#user_login", "Some username")
        await page.type("#user_password", "some password")
        await page.click("text=Sign in")

        const errorMessage = await page.locator(".alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    })

    test("Assertions @myTag", async ({page}) =>
    {
        await page.goto("https://www.example.com")
        await expect(page).toHaveURL("https://www.example.com")
        await expect(page).toHaveTitle("Example Domain")

        //Checks element visibility, text AND how many h1's (or any locator) we expect on the page.
        const element = await page.locator("h1")
        await expect(element).toBeVisible()
        await expect(element).toHaveText("Example Domain")
        await expect(element).toHaveCount(1)

        //Checks that element is NOT visible
        const nonExistingElement = await page.locator("h5")
        await expect(nonExistingElement).not.toBeVisible()
    }) 
})

test.describe.parallel.only("Hooks", () =>{

    test.beforeEach(async ({page}) => {
        //Hook to load webpage for each test in this hooks method.
        await page.goto("https://example.com/")
    })

        test("Screenshots", async ({ page }) => {
            //take screenshot of full page
            await page.screenshot({path: "screenshot.png", fullPage: true})
        })
        
        test("Single element screenshot", async ({page}) => {
            const element = await page.$("h1")
            await element?.screenshot({ path: "single_element_screenshot.png"})
        })
})

//custom functions - imported from helpers.ts at the top of the file.
test("Custom Helpers", async ({page}) => {
    await loadHomepage(page)
    //below pausing brings up Playwright Inspector
    //await page.pause()
    await assertTitle(page)
})

