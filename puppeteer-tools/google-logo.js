const puppeteerClient = require('./utils/puppeteer-client.js');
const Logger = require('./utils/logger.js');

async function getGoogleLogo(url) {
  const {browser, page} = await puppeteerClient.startBrowser();
  Logger.debug(await browser.version());
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.screenshot({ path: 'puppeteer-tools/data/screenshots/google.png' });
  const googleLogo = await page.$eval('#hplogo', img => img.src);

  Logger.debug("Close browser...");
  await puppeteerClient.closeBrowser(browser);
  return {url, googleLogo};
}

(async () => {
  const {url, googleLogo} = await getGoogleLogo('https://google.com');
  Logger.info(`URL: ${url} - Logo URL: ${googleLogo}`);
  process.exit(1);
})();
