const { test, expect } = require('@playwright/test');

test('test stackstream page', async ({ page }) => {
    await page.goto('https://stack-stream.com/')
    // await page.pause()

    // Allow cookies
    await page.getByRole('link', { name: 'Allow selection' }).click()
    // await page.pause()

    // Start page expectations
    await expect(page).toHaveTitle(/stackstream/)
    const landingPageTitlesOriginal = page.locator('.landing-page-tiles')
    await expect(landingPageTitlesOriginal).toContainText('Problem Solving')
    await expect(landingPageTitlesOriginal).toContainText('Freelancing')
    await expect(landingPageTitlesOriginal).toContainText('Tech Employer Branding')
    await expect(landingPageTitlesOriginal).toContainText('Hiring')
    // await page.pause()

    // Compare Screenshots
    // expect(await page.screenshot()).toMatchSnapshot('stackstream.png');
    // await page.pause()

    // Click on landing page switch
    const landingPageSwitch = page.locator('.landing-page-switch')
    await landingPageSwitch.click()
    await expect(landingPageTitlesOriginal).toContainText('Live Stream')
    // await page.pause()

    // Click on Free/Live Stream link
    await page.getByRole('link', { name: 'Free', exact: true }).click()
    const lastStreamHeader = page.getByRole('heading', { name: 'Last Streams' }).nth(1)
    await expect(lastStreamHeader).toContainText('Last Streams')
    // await page.pause()

    // Click on Technologies to open filter
    await page.getByRole('heading', { name: 'Technologies' }).click()
    // await page.pause()
    
    // Select GraphQL from filter
    const technologyInput = page.locator('#rc_select_2')
    await technologyInput.type('GraphQL')
    const graphQLEntry = page.getByTitle('GraphQL').getByText('GraphQL')
    await graphQLEntry.click()
    // await page.pause()

    // Check results
    const pageContent = page.locator('.app-content')
    await expect(pageContent).toContainText('graphql-server')
    await expect(pageContent).toContainText('StefanAtDev')
    // await page.pause()
});
