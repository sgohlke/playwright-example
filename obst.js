const playwright = require('playwright');

(async () => {
  for (const browserType of ['chromium', 'firefox', 'webkit']) {
    console.info(`Running Playwright for browser ${browserType}`);
    const browser = await playwright[browserType].launch({headless: true});
    console.info(`Launched browser ${browserType}`);
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://sgohlke.github.io/obstimmerlecker/');
    console.info(`Called page on ${browserType}`);
    //await page.pause();
    console.info(`Fetching page content on ${browserType}`);
    const pageBodyLocator = page.locator('article section');
    const bodyHTML = await pageBodyLocator.evaluate(node => node.innerHTML)
    console.info(`Got page content on ${browserType}: ${JSON.stringify(bodyHTML)}`);
    await page.screenshot({ path: `obst/obst-${browserType}.png`});
    console.info(`Screenshot taken browser ${browserType}`);
    await browser.close();
    console.info(`Closed browser ${browserType}`);
  }
})();
