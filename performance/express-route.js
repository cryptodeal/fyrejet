'use strict'

var express = require('express')

var app = express()

app.set('etag', false)

app.get('/hi', function (req, res) {
  res.send('')
})

app.listen(3005)
