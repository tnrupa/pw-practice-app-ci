import {test, expect} from '@playwright/test'



test.beforeEach (async({page},testInfo) => {

await page.goto(process.env.URL)
await page.getByText('Button Triggering AJAX Request').click()
testInfo.setTimeout (testInfo.timeout + 2000)
})


test('auto waiting', async({page}) => {

const successButton = page. locator('.bg-success')
// await successButton.click()
// const text = await successButton.textContent()
// await successButton.waitFor({state: "attached"})
// const text = await successButton.allTextContents()
// expect(text).toContain('Data loaded with AJAX get request.')
await expect (successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

})


test.skip('alternative waits', async({page}) =>{

const successButton = page. locator('.bg-success')
//______ wait for element
// await page.waitForSelector('.bg-success')
//__ wait for particlular response
// await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
//wait for network calls to be completed ('NOT RECOMMENDED') 
await page.waitForLoadState('networkidle')
await page.waitForTimeout(5000)
const text = await successButton.allTextContents()
expect(text).toContain('Data loaded with AJAX get request.')
})

test.skip('timeouts', async({page}) =>{
 //   test.setTimeout(10000) //test timeout
    test.slow() //slow multiplies test time by 3,so it waits for 30s
    const successButton = page. locator('.bg-success')
   // await successButton.click({timeout: 18000}) //actiontimeout
   await successButton.click()
})