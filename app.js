var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var routes = require('./controllers/routes')
var hbs = require('express-handlebars')
var port = process.env.PORT || 3000;

var app = express()

// Configure app. Note: don't need to require ejs.  Express does this for us
//app.set('view engine', 'ejs')
//app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'handlebars');
app.engine('handlebars', hbs({ defaultLayout: 'main' }));

// Check out passport authentication

// Provide access to public folder contents
app.use(express.static(path.join(__dirname, 'public')))

// Use middleware
app.use(bodyParser())

// Middleware for error handling.  If error, serve the error page.
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: err
	})
})

// Include routes. Note: if had app.use('/api', routes); then the root of the required object would be /api
app.use(routes);

app.listen(port, function(err) {
	if(err) throw err;
	console.log("App listening on port " + port)
})

/*
	app.get()
	app.post()
	app.put()
	app.del()

	res.set() : set response headers
	res.send(): give it something and it stringify's it
	res.json(): stringify js value
	res.render(): uniform view engine, 
*/