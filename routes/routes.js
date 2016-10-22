var mongoose = require('mongoose');
require('../models/user');
//var model = require('../config/model');
var User = mongoose.model('User');

var routes = {

	configroute: function(app) {

		/*app.post('/signup', function(req, res){
			model.signup(req, res);    
		}); */
        
		
		app.get('/index', function(req, res){
		    res.send('Manas');
		});

		/*app.post('/login', function(req, res){
		           res.send(req.body) 
		});*/

		

		app.post('/forgotPassword', function(req, res){
		             res.send(req.body) 
		});
    }
}

module.exports = routes;
