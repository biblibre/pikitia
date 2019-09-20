'use strict';

const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/screenshot', async function(req, res, next) {
  try {
    const browser = await getBrowser();
    const page = await getPage(browser, req.query.url, req.cookies);

    const buffer = await page.screenshot({
      fullPage: true,
    });

    await browser.close();

    res.set('Content-Type', 'image/png');
    res.status(200).send(buffer);
  } catch (err) {
    next(err);
  }
});

app.get('/pdf', async function(req, res, next) {
  try {
    const browser = await getBrowser();
    const page = await getPage(browser, req.query.url, req.cookies);

    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    res.set('Content-Type', 'application/pdf');
    res.status(200).send(buffer);
  } catch (err) {
    next(err);
  }
});

function getBrowser() {
  const executablePath = path.join(__dirname, 'node_modules', 'puppeteer', '.local-chromium', 'linux-686378', 'chrome-linux', 'headless_shell');
  const options = {
    executablePath: executablePath,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  };

  return puppeteer.launch(options);
}

async function getPage(browser, url, cookies) {
  const page = await browser.newPage();

  const cookiesObjs = Object.entries(cookies).map(([name, value]) => ({ name, value, url }));
  if (cookiesObjs.length > 0) {
    await page.setCookie(cookiesObjs);
  }

  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  return page;
}

module.exports = app;
