const path = require('path');
const puppeteer = require('puppeteer');

module.exports = {
  pdf,
  screenshot,
};

async function pdf (url, options) {
  const browser = await getBrowser();
  const page = await getPage(browser, url, options);

  const pdfOptions = {
    format: 'A4',
    scale: 0.5,
    printBackground: true,
    displayHeaderFooter: options.displayHeaderFooter || false,
    headerTemplate: options.headerTemplate || '',
    footerTemplate: options.footerTemplate || '',
  };

  const buffer = await page.pdf(pdfOptions);

  await browser.close();

  return buffer;
}

async function screenshot (url, options) {
  const browser = await getBrowser();

  // Chromium has a hard time taking a screenshot of a tall page. It is most of
  // the time incomplete.
  // But, as strange as it sounds, using a viewport wider than the default
  // (800px) and taking a second screenshot seems to work, so...
  if (!options.viewport) {
    options.viewport = { width: 960, height: 540 };
  }
  const page = await getPage(browser, url, options);
  await page.screenshot({ fullPage: true });
  const buffer = await page.screenshot({ fullPage: true });

  await browser.close();

  return buffer;
}

function getBrowser() {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revInfo = browserFetcher.revisionInfo('737027');

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
    await page.setViewport(options.viewport);
  }

  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  return page;
}
