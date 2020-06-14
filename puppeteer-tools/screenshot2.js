const puppeteerClient = require('./utils/puppeteer-client.js');
const Logger = require('./utils/logger.js');
const StringExtract = require('./utils/string-extract.js');
const fs = require('fs');

async function generateScreenshot(url) {
  const {browser, page} = await puppeteerClient.startBrowser();
  Logger.debug(`${await browser.version()}, URL: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  // BUild the image data
  const screenData = await page.screenshot({
    omitBackground: true,
    encoding: 'binary',
    type: 'jpeg',
    quality: 30
  });
  fs.writeFileSync(`puppeteer-tools/data/screenshots/${StringExtract.domain(url)}.jpg`, screenData);

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

