const puppeteer = require('puppeteer');

// Open new page and search by Keyword "Encore"
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://google.com');
  await page.click('input.gLFyf')
  await page.keyboard.type('Encore Shao')
  await page.keyboard.press('Enter')
  await page.waitFor(4000)
  await browser.close()
})();
