var express = require('../')
var request = require('supertest')

describe('app', function () {
  describe('.VERB()', function () {
    it('should not get invoked without error handler on error', function (done) {
      var app = express()

      app.use(function (req, res, next) {
        next(new Error('boom!'))
      })

      app.get('/bar', function (req, res) {
        res.send('hello, world!')
      })

      request(app)
        .post('/bar')
        .expect(500, /Error: boom!/, done)
    })

    it('should only call an error handling routing callback when an error is propagated', function (done) {
      var app = express()

      var a = false
      var b = false
      var c = false
      var d = false

      app.get('/', function (req, res, next) {
        next(new Error('fabricated error'))
      }, function (req, res, next) {
        a = true
        next()
      }, function (err, req, res, next) {
        b = true
        err.message.should.equal('fabricated error')
        next(err)
      }, function (err, req, res, next) {
        c = true
        err.message.should.equal('fabricated error')
        next()
      }, function (err, req, res, next) {
        d = true
        next()
      }, function (req, res) {
        a.should.be.false()
        b.should.be.true()
        c.should.be.true()
        d.should.be.false()
        res.send(204)
      })

      request(app)
        .get('/')
        .expect(204, done)
    })
  })
})
