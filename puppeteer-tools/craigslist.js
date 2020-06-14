const puppeteerClient = require('./utils/puppeteer-client.js');
const Logger = require('./utils/logger.js');

async function getBunnies(url) {
  const {browser, page} = await puppeteerClient.startBrowser();
  Logger.debug(`${await browser.version()}`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  Logger.debug('Parse items...');
  await page.waitFor('.result-row');
  const results = await page.$$eval('.result-row', rows => {
    return rows.map(row => {
      const properties = {};

      const titleElement = row.querySelector('.result-title');
      properties.title = titleElement.innerText;
      properties.url = titleElement.getAttribute('href');

      const priceElement = row.querySelector('.result-price');
      properties.price = priceElement ? priceElement.innerText : '';
      return properties;
    });
  });

  Logger.debug('Close browser...');
  await puppeteerClient.closeBrowser(browser);
  return {url, results};
}

(async () => {
  const {url, results} = await getBunnies('https://nh.craigslist.org/search/sss?query=bunnies&sort=rel&hasPic=1');
  Logger.info(url);
  Logger.info(results);
  process.exit(1);
})();
