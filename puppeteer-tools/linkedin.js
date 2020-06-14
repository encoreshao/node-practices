const puppeteerClient = require('./utils/puppeteer-client.js');
const Logger = require('./utils/logger.js');

async function getLinkedInPage(url) {
  const {browser, page} = await puppeteerClient.startBrowser();
  Logger.debug(`${await browser.version()}`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  Logger.debug('Parse LinkedIn Page...');
  await page.waitFor('.org-organization-page__container');
  const properties = {};

  const title = await page.evaluate(() => document.querySelector('.org-top-card-summary__title:first-child').textContent);
  const industry = await page.evaluate(() => document.querySelector('.org-top-card-summary-info-list__info-item:last-child').textContent);

  properties.title = title;
  properties.industry = industry;

  console.log("Close Browser...");
  await puppeteerClient.closeBrowser(browser);
  return {url, properties};
}

(async () => {
  const {url, properties} = await getLinkedInPage('https://www.linkedin.com/company/ekohe/');
  Logger.info(`URL: ${url} - Properties: ${properties}`);
  process.exit(1);
})();
