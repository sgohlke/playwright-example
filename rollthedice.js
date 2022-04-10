const playwright = require('playwright');

(async () => {
  const browsers = ['chromium', 'firefox', 'webkit']
  const isHeadless = true

  for (const browserType of browsers) {
    console.info(`Running Playwright for browser ${browserType}`);
    const browser = await playwright[browserType].launch({headless: isHeadless});
    console.info(`Launched browser ${browserType}`);

    const context = await browser.newContext({recordVideo: {dir:'dice'}});
    const page = await context.newPage();
    await page.goto('https://sgohlke.github.io/rollthedice/');
    console.info(`Called page on ${browserType}`);
    
    //console.info(`Fetching page HTML on ${browserType}`);
    //const pageBodyLocator = page.locator('html');
    //const bodyHTML = await pageBodyLocator.evaluate(node => node.innerHTML)
    //console.info(`Got page HTML on ${browserType}: ${JSON.stringify(bodyHTML)}`);

    // CLick the roll button
    await page.locator('#rollButton').click();

    console.info(`Fetching game results on ${browserType}`);
    const resultsLocator = page.locator('#result');
    const results = await resultsLocator.evaluate(node => node.innerText)
    console.info(`Got results on ${browserType}: ${results}`);


    await page.screenshot({ path: `dice/dice-${browserType}.png`});
    console.info(`Screenshot taken browser ${browserType}`);

    // For debugging purposes
    // await page.pause();

    await context.close()

    await page.video().saveAs(`dice/dice-${browserType}.webm`);
    console.info(`Video saved for browser ${browserType}`);

    await browser.close();
    console.info(`Closed browser ${browserType}`);
  }
})();
