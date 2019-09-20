# Pikitia

Take a screenshot of a [Urungi] page and convert it to PDF or image

## Installation

```
git clone https://github.com/biblibre/pikitia
cd pikitia
npm install
wget -O headless-shell.zip 'https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F686378%2Fheadless-shell.zip?alt=media'
unzip -j -d node_modules/puppeteer/.local-chromium/linux-686378/chrome-linux/ headless-shell.zip
```

[Urungi]: https://github.com/biblibre/urungi
