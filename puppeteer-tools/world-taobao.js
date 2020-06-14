const puppeteerClient = require('./utils/puppeteer-client.js');
const Logger = require('./utils/logger.js');

async function getShopItems(url) {
  const {browser, page} = await puppeteerClient.startBrowser();
  Logger.debug(`${await browser.version()} - URL: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle2' });

  Logger.debug('Parse items...');
  await page.waitFor('.item-container');
  const results = await page.$$eval('.item-container', rows => {
    return rows.map(row => {
      const titleElement = row.querySelector('.item-title');
      if (titleElement) {
        const properties = {};
        properties.title = titleElement ? titleElement.innerText : '';

        const urlElement = row.querySelector('.item-con');
        properties.url = urlElement ? urlElement.getAttribute('href') : '';

        const priceElement = row.querySelector('.price');
        properties.price = priceElement ? priceElement.innerText : '';
        return properties;
      }
    }).filter((obj) => obj );
  });

  Logger.debug('Close browser...');
  await puppeteerClient.closeBrowser(browser);
  return {url, results};
}

(async () => {
  const {url, results} = await getShopItems('https://world.taobao.com/');
  Logger.info(url);
  Logger.info(results);
  process.exit(1);
})();
