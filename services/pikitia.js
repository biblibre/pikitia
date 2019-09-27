const path = require('path');
const puppeteer = require('puppeteer');

module.exports = {
  pdf,
  screenshot,
};

async function pdf (url, options) {
  const browser = await getBrowser();
  const page = await getPage(browser, url, options);

  const buffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  return buffer;
}

async function screenshot (url, options) {
  const browser = await getBrowser();
  const page = await getPage(browser, url, options);

  const buffer = await page.screenshot({
    fullPage: true,
  });

  await browser.close();

  return buffer;
}

function getBrowser() {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revInfo = browserFetcher.revisionInfo('686378');

  const executablePath = path.join(path.dirname(revInfo.executablePath), 'headless_shell');
  const options = {
    executablePath: executablePath,
  };

  return puppeteer.launch(options);
}

async function getPage(browser, url, options) {
  const page = await browser.newPage();

  if (options.cookies) {
    const cookiesObjs = Object.entries(options.cookies)
      .map(([name, value]) => ({ name, value, url }));

    if (cookiesObjs.length > 0) {
      await page.setCookie.apply(page, cookiesObjs);
    }
  }

  if (options.viewport) {
    page.setViewport(options.viewport);
  }

  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  return page;
}
