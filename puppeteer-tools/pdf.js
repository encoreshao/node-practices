const puppeteerClient = require('./utils/puppeteer-client.js');
const Logger = require('./utils/logger.js');
const StringExtract = require('./utils/string-extract.js');

async function generatePDF(url) {
  const {browser, page} = await puppeteerClient.startBrowser();
  Logger.debug(`${await browser.version()}`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.pdf({
    format: 'A4',
    path: `puppeteer-tools/data/screenshots/${StringExtract.domain(url)}.pdf`,
    printBackground: true
  });

  console.log("Close Browser...");
  await puppeteerClient.closeBrowser(browser);
  return {url}
}

(async () => {
  const {url} = await generatePDF('https://baidu.com');
  console.info(`Generated - ${url}`);
  process.exit(1);
})();
