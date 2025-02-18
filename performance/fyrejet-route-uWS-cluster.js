'use strict'

var cluster = require('cluster')

if (cluster.isMaster) {
  var numCPUs = require('os').cpus().length
  if (!isNaN(parseInt(process.argv[process.argv.length - 1]))) {
    numCPUs = parseInt(process.argv[process.argv.length - 1])
  }
  console.log('using processes: ' + numCPUs)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
} else {
  var express = require('../index')

  var app = express({
    prioRequestsProcessing: false, // without this option set to 'false' uWS is going to be extremely sluggish
    server: express.uwsCompat(),
    serverType: 'uWebSockets'
  })

  app.get('/hi', function (req, res) {
    res.send('')
  })

  app.listen(4004)
}
