const puppeteer = require('puppeteer');

// Boilerplate stuff
async function startBrowser() {
  const browser = await puppeteer.launch({
    args : [
      '--no-sandbox'
    ],
    defaultViewport: null
  });
  const page = await browser.newPage();
  return {browser, page};
}

async function closeBrowser(browser) {
  return browser.close();
}

module.exports = {
  startBrowser: startBrowser,
  closeBrowser: closeBrowser
};
