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

It loads the given URL, takes a screenshot of the whole page and convert it to a PNG image.

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
