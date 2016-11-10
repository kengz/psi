const log = require('./log')
const Promise = require('bluebird')

// Node that async/await merely 'hides' the promises and
// save us from using nested .then().
// Its argument is still a Promise objet
async function demo() {
  log.info('starting wait')
  await Promise.delay(3000)
  log.info('stopping wait')
}

demo()
