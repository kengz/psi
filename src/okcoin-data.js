process.env.NODE_CONFIG_DIR = `${__dirname}/../config`
const log = require('./log')
const config = require('config')
const unirest = require('unirest')

const okConfig = config.get('OKCoin')
const rootUrl = okConfig.get('root_url')
const apiKey = okConfig.get('api_key')
const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' }

async function demoTicker() {
  let body
  await new Promise((resolve, reject) => {
    unirest.get(`${rootUrl}/ticker.do`)
      .headers(headers)
      .query({
        api_key: apiKey,
        symbol: 'btc_usd',
      })
      .end((response) => {
        if (response.code === 200) {
          body = response.body
          resolve(response.body)
        } else {
          body = response.error
          reject(response.error)
        }
      })
  })
  log.info(body)
}

module.exports = {
  demoTicker,
}
