'use_strict';

const express        = require('express'),
      path           = require('path'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      routes         = require('./controllers/routes'),
      hbs            = require('express-handlebars');

const app = express();

const PORT = 3000;

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs({ defaultLayout: 'main' }));

// Provide access to public folder contents
app.use(express.static(path.join(__dirname, 'public')));

// Use middleware
app.use(bodyParser());

// Middleware for error handling.  If error, serve the error page.
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	res.render('error', {
		message: err.message,
		error: err
	})
})

// Include routes
app.use(routes);

// Start the server
app.listen(process.env.PORT || PORT, function(err) {
	if(err) throw err;
	console.log("App listening on port " + PORT)
})