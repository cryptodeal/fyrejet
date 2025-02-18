var express = require('../')
var request = require('supertest')
var assert = require('assert')

describe('Special Routing Mode', function () {
  	describe('API Mode', function () {
		describe('Global API Mode', function () {
    		it('should work', function (done) {
			  var app = express()
			  app.set('fyrejet mode', 'api')

    		  app.get('/', function (req, res) {
				let resJsonType = typeof res.json
				res.send(resJsonType)
    		  })

    		  request(app)
    		    .get('/')
    		    .expect('undefined', done)
			})
			it('re-enabling Express additions should work', function (done) {
				var app = express()
			  	app.set('fyrejet mode', 'api')
				  
				app.get('/express/', function(req,res) {
					req.activateExpress()
					let resJsonType = typeof res.json
					res.send(resJsonType)
				})
				
			  request(app)
    		    .get('/express')
    		    .expect('function', done)
			})
			it('should also work in nested router', function (done) {
				var app = express()
				var app2 = express.Router()
				app.set('fyrejet mode', 'api')
				
				app.get('*', (req,res, next) => {
					next()
				})

				app2.get('/', function (req, res) {
					let resJsonType = typeof res.json
					res.send(resJsonType)
				})

				app.use('/nested', app2)
  
				request(app)
				  .get('/nested/')
				  .expect('undefined', done)
			})
			it('re-enabling Express additions should also work in nested router', function (done) {
				var app = express()
				var app2 = express.Router()
				app.set('fyrejet mode', 'api')
				  
				app.get('*', (req,res, next) => {
					next()
				})
				  
				app2.get('/', function(req,res) {
					req.activateExpress()
					let resJsonType = typeof res.json
					res.send(resJsonType)
				})

				app.use('/nested', app2)
				
			  	request(app)
    		    	.get('/nested')
    		    	.expect('function', done)
			})
			it('should also work in mounted full instance of fyrejet', function (done) {
				var app = express()
				var app2 = express()
				app.set('fyrejet mode', 'api')
  
				app2.get('/', function (req, res) {
				  let resJsonType = typeof res.json
				  res.send(resJsonType)
				})

				app.use('/mounted', app2)
  
				request(app)
				  .get('/mounted/')
				  .expect('undefined', done)
			})

			it('re-enabling Express additions should also work in mounted full instance of fyrejet', function (done) {
				var app = express()
				var app2 = express()
				app.set('fyrejet mode', 'api')
				  
				app2.get('/', function(req,res) {
					req.activateExpress()
					let resJsonType = typeof res.json
					res.send(resJsonType)
				})

				app.use('/mounted', app2)
				
			  	request(app)
    		    	.get('/mounted/')
					.expect('function', done)
					
			})
		})
		describe('Route-only API Mode', function () {
			it('should work', function (done) {
				var app = express()
  
				app.get('/', function (req, res) {
				  let resJsonType = typeof res.json
				  res.send(resJsonType)
				}, 'api')
  
				request(app)
				  .get('/')
				  .expect('undefined', done)
			})
			it('should also work in nested router', function (done) {
				var app = express()
				var app2 = express.Router()
  
				app2.get('/', function (req, res) {
				  let resJsonType = typeof res.json
				  res.send(resJsonType)
				})

				app.use('/nested', app2, 'api')
  
				request(app)
				  .get('/nested/')
				  .expect('undefined', done)
			})

			it('should also work in mounted full instance of fyrejet', function (done) {
				var app = express()
				var app2 = express()
  
				app2.get('/', function (req, res) {
				  let resJsonType = typeof res.json
				  res.send(resJsonType)
				})

				app.use('/mounted', app2, 'api')
  
				request(app)
				  .get('/mounted/')
				  .expect('undefined', done)
			})

		})
	})
	describe('Properties as Functions Mode', function () {
		describe('Global Properties as Function Mode', function () {
    		it('should work', function (done) {
			  var app = express()
			  app.set('fyrejet mode', 'properties as functions')

    		  app.get('/', function (req, res) {
				res.end(req.hostname())
    		  })

    		  request(app)
				.get('/')
				.set('Host', 'example.com')
        		.expect('example.com', done)
			})
			it('req.propFn should be available', function (done) {
				var app = express()
				app.set('fyrejet mode', 'properties as functions')
  
				app.get('/', function (req, res) {
				  res.end(req.propFn.protocol.apply(req))
				})
  
				request(app)
				  .get('/')
				  .expect('http', done)
			})
			it('should also work in nested router', function (done) {
				var app = express()
				app.set('fyrejet mode', 'properties as functions')
				var app2 = express.Router()

				app2.get('/', function (req, res) {
					res.end(req.hostname())
				})

				app.use('/nested', app2)
  
				request(app)
					.get('/nested/')
					.set('Host', 'example.com')
        			.expect('example.com', done)
			})
			it('req.propFn should be available in nested router', function (done) {
				var app = express()
				app.set('fyrejet mode', 'properties as functions')
  
				var app2 = express.Router()

				app2.get('/', function (req, res) {
					res.end(req.propFn.protocol.apply(req))
				})

				app.use('/nested', app2)
  
				request(app)
				  .get('/nested/')
				  .expect('http', done)
			})
			it('should also work in mounted full instance of fyrejet', function (done) {
				var app = express()
				var app2 = express()
				app.set('fyrejet mode', 'properties as functions')
  
				app2.get('/', function (req, res) {
					res.end(req.hostname())
				})

				app.use('/mounted', app2)
  
				request(app)
				  .get('/mounted/')
				  .set('Host', 'example.com')
        		  .expect('example.com', done)
			})
			it('req.propFn should be available in mounted full instance of fyrejet', function (done) {
				var app = express()
				var app2 = express()
				app.set('fyrejet mode', 'properties as functions')
  
				app2.get('/', function (req, res) {
					res.end(req.propFn.protocol.apply(req))
				})

				app.use('/mounted', app2)
  
				request(app)
				  .get('/mounted/')
				  .set('Host', 'example.com')
        		  .expect('http', done)
			})
		})
		describe('Route-only API Mode', function () {
			it('should work', function (done) {
				var app = express()
  
				app.get('/', function (req, res) {
					res.end(req.hostname())
				}, 'propsAsFns')
  
				request(app)
				  .get('/')
				  .set('Host', 'example.com')
        		  .expect('example.com', done)
			})
			it('should also work in nested router', function (done) {
				var app = express()
				var app2 = express.Router()
  
				app2.get('/', function (req, res) {
					res.end(req.hostname())
				})

				app.use('/nested', app2, 'propsAsFns')
  
				request(app)
				  .get('/nested/')
				  .set('Host', 'example.com')
        		  .expect('example.com', done)
			})

			it('should also work in mounted full instance of fyrejet', function (done) {
				var app = express()
				var app2 = express()
  
				app2.get('/', function (req, res) {
					res.end(req.hostname())
				})

				app.use('/mounted', app2, 'propsAsFns')
  
				request(app)
				  .get('/mounted/')
				  .set('Host', 'example.com')
        		  .expect('example.com', done)
			})

		})
	})
	describe('No ETag Mode', function () {
		it('should work', function (done) {
			var app = express()

			app.get('/', function (req, res) {
				res.send('I do not have ETag')
			}, 'noEtag')

			request(app)
			  .get('/')
			  .expect(200)
			  .end(function(err, res) {
				assert(!res.headers['etag'])
				done()
			  })
		})
	})
})
