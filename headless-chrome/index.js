const puppeteer = require('puppeteer');

async function getBunnies() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  const uri = 'https://nh.craigslist.org/search/sss?query=bunnies&sort=rel&hasPic=1';

  page.goto(uri);
}

getBunnies();
