coffeescript = require 'coffee-script'
coffeecup = require 'coffeecup'
express = require 'express'
morgan = require 'morgan'
servestatic = require 'serve-static'
fs = require 'fs'
http = require 'http'
https = require 'https'

app = express()

app.set 'views', "#{__dirname}/webroot"
app.set 'view engine', 'coffee'
app.engine 'coffee', coffeecup.__express

app.use morgan 'dev'
app.use (req, res, next) ->
	if /(\/.*\w+)\.js/.test req.url
		matched = /(\/.*\w+)\.js/.exec req.url
		fs.readFile "#{__dirname}/webroot#{matched[1]}.coffee", (err, data) ->
			console.log "Changing route from #{req.url} to #{matched[1]}.coffee"
			req.url = "#{matched[1]}.coffee"
			next()
	else
		console.log "#{req.url}"
		next()

app.use servestatic "#{__dirname}/webroot"

helpers = {}
helpers["_#{f.slice 0, -3}"] = require "./include/#{f}" for f in fs.readdirSync('./include') when f.slice(-3) is ".js"

app.get '/', (req, res) ->
	res.render 'index', empty: '', hardcode: helpers

options =
	key: fs.readFileSync "#{__dirname}/certs/server.key"
	cert: fs.readFileSync "#{__dirname}/certs/server.crt"

wwwdata = -> process.setuid "www-data"
localhost = "0.0.0.0"

httpServer = http.createServer (req, res) ->
	res.writeHead 301, "Content-Type": "text/plain", "Location": "https://#{req.headers.host + req.url}"
	res.end()
httpsServer = https.createServer options, app
httpServer.listen 80, localhost, wwwdata
httpsServer.listen 443, localhost, wwwdata

console.log "Jarvis initialized"
