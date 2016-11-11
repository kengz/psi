const log = require('./log')
const dbEnvConfig = require('../config/db.json')
const Promise = require('bluebird')
const { exec } = require('child_process')
const _ = require('lodash')
const Sequelize = require('sequelize')

Promise.config({ warnings: false })

/* istanbul ignore next */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const dbConfig = _.get(dbEnvConfig, `${process.env.NODE_ENV}`)

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig)

/* istanbul ignore next */
function createDb() {
  const sysSeq = new Sequelize(
    dbConfig.dialect,
    dbConfig.username,
    dbConfig.password,
    dbConfig)
  const nodeEnvs = ['test', 'development', 'production']
  const createDbQueries = _.map(nodeEnvs, (nodeEnv) => {
    const dbName = _.get(dbEnvConfig, `${nodeEnv}.database`)
    return `CREATE DATABASE ${dbName};`
  })

  return Promise.any(
    _.map(createDbQueries, (createDbQuery) => {
      sysSeq.query(createDbQuery)
    })).then(() => {
      sysSeq.close()
      log.info('Created the psi databases')
    }).catch(e => log.error(JSON.stringify(e, null, 2)))
}

/* istanbul ignore next */
function authDb() {
  return sequelize
    .authenticate()
    .then(() => log.info('Authenticated database successfully'))
    .catch(() => createDb())
    .finally(() => sequelize.close())
}

/* istanbul ignore next */
function migrateDb() {
  return new Promise((resolve, reject) => {
    let cmd = `./node_modules/.bin/sequelize db:migrate --env ${process.env.NODE_ENV}`
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        log.error(stderr.toString())
        reject(err)
      }
      log.debug(stdout.toString())
      resolve()
    })
  })
}

module.exports = {
  authDb,
  migrateDb,
}

/* istanbul ignore next */
if (require.main === module) {
  authDb()
}
