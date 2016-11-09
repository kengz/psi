const Promise = require('bluebird')

// Node that async/await merely "hides" the promises and save us from using nested .then(). Its argument is still a Promise objet
async function demo() {
  console.log("starting wait")
  let lame = await Promise.delay(3000)
  console.log("stopping wait")
}

demo()
