var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var route = require('./routes/routes');
var oauthserver = require('oauth2-server');
require('./config/db');
var model = require('./config/model');
app.use(bodyParser.urlencoded({extended: true}))
const PORT = process.env.PORT || 8080;
const BASEURL = process.env.BASEURL || 'http://localhost:8080';

app.use(bodyParser.json())

app.oauth = oauthserver({
    model: require('./config/model'),
    grants: ['password', 'refresh_token'],
    debug: true
});



/*app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
 });*/


/**
 * Get access token based on user credentials
 *  
 */

app.post('/signup', function (req, res) {
    model.signup(req, res);
});


app.all('/oauth/token', app.oauth.grant());
app.use(app.oauth.authorise(), function (req, res, next) {
    next();
});

/*app.post('/client', function(req, res){
 model.clientSignup(req, res);    
 }); 
 */

app.get('/users', function (req, res) {
    model.userlist(req, res);
});

app.use(app.oauth.errorHandler());

route.configroute(app);

app.listen(PORT, function () {
    console.log("Server running on" + BASEURL);
});
//
