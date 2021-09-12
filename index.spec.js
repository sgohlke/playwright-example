const { test, expect } = require('@playwright/test');

test('test github page', async ({ page }) => {
    await page.goto('https://sgohlke.github.io/obstimmerlecker/');
    await expect(page).toHaveTitle(/Obsthandel ImmerLecker/)
    const footer = page.locator('footer p');
    await expect(footer).toContainText('Leckerschmaus');
    expect(await page.screenshot()).toMatchSnapshot('obst.png');
});
