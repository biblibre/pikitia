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

### Chromium headless shell dependencies

Pikitia uses Chromium headless shell to load web pages and take screenshots.
You need to be sure all its dependencies are satisfied. You can check that by
running the following command

```
ldd node_modules/puppeteer/.local-chromium/linux-686378/chrome-linux/headless_shell | grep not
```

It will output the list of dependencies that are **NOT** satisfied.

On a Debian-based system you can install most of these dependencies by executing
the following command

```
apt install libasound2 libatk1.0-0 libatspi2.0-0 libdbus-1-3 libnss3 \
    libpangocairo-1.0-0 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxi6 libxtst6 libxss1
```

## Usage

### Simple

```
npm start
```

### Using pm2

```
pm2 start ecosystem.config.js
```

## API

Pikitia provides the following API endpoints

### `GET /screenshot`

It loads the given URL, takes a screenshot of the whole page and convert it to a
PNG image.

Cookies sent to `/screenshot` will also be sent to the given URL.

#### Parameters

Name | Usage       | Example
---- | ----------- | --------------------------------------------------------
url  | URL to load | http://urungi/#/dashboards/view/5d84a17be03fcf2ed8132584

#### Example

```
GET http://pikitia/screenshot?url=http%3A%2F%2Furungi%2F%23%2Fdashboards%2Fview%2F5d84a17be03fcf2ed8132584
```

### `GET /pdf`

It loads the given URL and generates a PDF from the loaded page.

Cookies sent to `/pdf` will also be sent to the given URL.

#### Parameters

Name | Usage       | Example
---- | ----------- | --------------------------------------------------------
url  | URL to load | http://urungi/#/dashboards/view/5d84a17be03fcf2ed8132584

#### Example

```
GET http://pikitia/pdf?url=http%3A%2F%2Furungi%2F%23%2Fdashboards%2Fview%2F5d84a17be03fcf2ed8132584
```

[Urungi]: https://github.com/biblibre/urungi
