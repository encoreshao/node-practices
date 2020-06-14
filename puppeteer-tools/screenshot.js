const puppeteerClient = require('./utils/puppeteer-client.js');
const Logger = require('./utils/logger.js');
const StringExtract = require('./utils/string-extract.js');

async function generateScreenshot(url) {
  const {browser, page} = await puppeteerClient.startBrowser();
  Logger.debug(`${await browser.version()}, URL: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.screenshot({path: `puppeteer-tools/data/screenshots/${StringExtract.domain(url)}.png`});

  Logger.debug("Close Browser...");
  await puppeteerClient.closeBrowser(browser);

  return {url};
}

(async () => {
  const urls = process.argv.slice(2);
  const {url} = await generateScreenshot(urls[0]);
  Logger.info(`Generated - ${url}`);
  process.exit(1);
})();
