# Pikitia

Take a screenshot of a [Urungi] page and convert it to PDF or image

## Requirements

- Node.js (>= 8)
- MongoDB (>= 3.4)

## Installation

```
git clone https://github.com/biblibre/pikitia
cd pikitia
npm install
wget -O headless-shell.zip 'https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F737027%2Fheadless-shell.zip?alt=media'
unzip -j -d node_modules/puppeteer/.local-chromium/linux-737027/chrome-linux/ headless-shell.zip
```

### Chromium headless shell dependencies

Pikitia uses Chromium headless shell to load web pages and take screenshots.
You need to be sure all its dependencies are satisfied. You can check that by
running the following command

```
ldd node_modules/puppeteer/.local-chromium/linux-737027/chrome-linux/headless_shell | grep not
```

It will output the list of dependencies that are **NOT** satisfied.

On a Debian-based system you can install most of these dependencies by executing
the following command

```
apt install libasound2 libatk1.0-0 libatspi2.0-0 libdbus-1-3 libdrm2 libgbm1 \
    libnss3 libpangocairo-1.0-0 libx11-xcb1 libxcb-dri3-0 libxcomposite1 \
    libxcursor1 libxdamage1 libxi6 libxtst6 libxss1
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

### `POST /oauth/token`

Pikitia implements OAuth2 authentication mechanism (`client_credentials` grant
type only). You need to create an access token to use the other endpoints.

To create an access token, you will need to create a
`client_id`/`client_secret` pair. Clients are stored in MongoDB database. Use
mongo-shell to connect to it and run the following command (replace CLIENTID and CLIENTSECRET)

```
db.getCollection('clients').insertOne({ client_id: 'CLIENTID', client_secret: 'CLIENTSECRET' })
```

Now you can make a POST request to `/oauth/token` with those `client_id` and `client_secret`.

#### Example

```
POST /oauth/token
Authorization: Basic Q0xJRU5USUQvQ0xJRU5UU0VDUkVU
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
```

### `POST /screenshot`

It loads the given URL, takes a screenshot of the whole page and convert it to a
PNG image.

#### Body

It should be a JSON object containing the following keys

Name     | Type      | Usage           | Example
-------- | --------- | -----------     | --------------------------------------------------------
url      | String    | URL to load     | http://urungi/#/dashboards/view/5d84a17be03fcf2ed8132584
cookies  | Object    | Cookies to send | { "connect.sid": "sessionId" }
viewport | Object    | Viewport        | { "width": 1920, "height": 1080 }

#### Example

```
POST http://pikitia/screenshot

{
    "url": "http://urungi/#/dashboards/view/5d84a17be03fcf2ed8132584",
    "cookies": {
        "connect.sid": "sessionId"
    },
    "viewport": {
        "width": 1920,
        "height": 1080
    }
}
```

### `POST /pdf`

It loads the given URL and generates a PDF from the loaded page.

#### Body

It should be a JSON object containing the following keys

Name    | Type      | Usage           | Example
------- | --------- | -----------     | --------------------------------------------------------
url     | String    | URL to load     | http://urungi/#/dashboards/view/5d84a17be03fcf2ed8132584
cookies | Object    | Cookies to send | { "connect.sid": "sessionId" }
displayHeaderFooter | Boolean | Display header and footer | true
headerTemplate | String | HTML template for the print header | `<span class="date"></span>`
footerTemplate | String | HTML template for the print footer | `<span class="pageNumber"></span>`

#### Example

```
POST http://pikitia/pdf

{
    "url": "http://urungi/#/dashboards/view/5d84a17be03fcf2ed8132584",
    "cookies": {
        "connect.sid": "sessionId"
    },
    "displayHeaderFooter": true,
    "headerTemplate": "<span class="date"></span>",
    "footerTemplate": "<span class="pageNumber"></span>"
}
```

[Urungi]: https://github.com/biblibre/urungi
