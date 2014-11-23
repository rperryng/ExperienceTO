var express = require('express'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

mongoose.connect('mongodb://104.236.63.85:27017/ExperienceTO');

// subapps
var registerConsumer = require('./server/components/signup_user');
var registerBusiness = require('./server/components/signup_business');
var registerBusinessApi = require('./server/api/businesses');
var registerBusinessPicture = require('./server/api/businessesImage');

var app = express();

// parse url encoded form data
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
app.use(registerBusinessPicture);

// No other middlware handled the request, send a 404
app.use(function (req, res) {
  res.sendStatus(404);
});

var port = 80;
app.listen(port, function () {
  console.log('business ideas happen at port', port);
});

