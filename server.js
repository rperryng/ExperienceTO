var express = require('express'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose');
    bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/ExperienceTO')

// subapps
var registerConsumer = require('./server/components/signup_user');
var registerBusiness = require('./server/components/signup_business');
var registerBusinessApi = require('./server/api/businesses');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/client', express.static(__dirname + '/client'));

// Setup handlebars templating
var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: './server/views/layouts',
  partialsDir: './server/views/partials'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// conmponent middleware
app.use(registerConsumer);
app.use(registerBusiness);
app.use(registerBusinessApi);

// No other middlware handled the request, send a 404
app.use(function (req, res) {
  res.sendStatus(404);
});

var port = 3000;
app.listen(port, function () {
  console.log('business ideas happen at port', 3000);
});

