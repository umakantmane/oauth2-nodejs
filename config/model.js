/**
 * Copyright 2013-present NightWorld.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  model = module.exports;

//
// Schemas definitions
//
var OAuthAccessTokensSchema = new Schema({
  accessToken: { type: String },
  clientId: { type: String },
  userId: { type: String },
  expires: { type: Date }
});

var OAuthRefreshTokensSchema = new Schema({
  refreshToken: { type: String },
  clientId: { type: String },
  userId: { type: String },
  expires: { type: Date }
});

var OAuthClientsSchema = new Schema({
  clientId: { type: String,required:true},
  clientSecret: { type: String,required:true},
  redirectUri: { type: String,required:true}
});

var OAuthUsersSchema = new Schema({
  username: { type: String,required:true},
  password: { type: String,required:true},
  /*firstname: { type: String,required:true},
  lastname: { type: String,required:true},*/
  email: { type: String,required:true, unique:true},
  emailVerification:{type:String, default:0}
});

mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);
mongoose.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
mongoose.model('OAuthClients', OAuthClientsSchema);
mongoose.model('OAuthUsers', OAuthUsersSchema);

var OAuthAccessTokensModel = mongoose.model('OAuthAccessTokens'),
  OAuthRefreshTokensModel = mongoose.model('OAuthRefreshTokens'),
  OAuthClientsModel = mongoose.model('OAuthClients'),
  OAuthUsersModel = mongoose.model('OAuthUsers');

//
// oauth2-server callbacks
//

model.signup  = function(req, res) {
		  var user = new OAuthUsersModel(req.body);
   user.save(function(err, result) {
	  if (err)
		res.send(err);	
		else
		res.send(result);	
   });
};

model.clientSignup  = function(req, res) {
		  var clientSi = new OAuthClientsModel(req.body);
   clientSi.save(function(err, result) {
	  if (err)
		res.send(err);	
		else
		res.send(result);	
   });
};

model.userlist = function(req, res) {
	OAuthUsersModel.find(function(err, result) {
	 if(err)
		res.send(err);
		else
		res.send(result);	
	});
};
model.getAccessToken = function (bearerToken, callback) {
  console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

  OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);
};

model.getClient = function (clientId, clientSecret, callback) {
  console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
  if (clientSecret === null) {
    return OAuthClientsModel.findOne({ clientId: clientId }, callback);
  }
  OAuthClientsModel.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
};

// This will very much depend on your setup, I wouldn't advise doing anything exactly like this but
// it gives an example of how to use the method to resrict certain grant types
var authorizedClientIds = ['s6BhdRkqt3', 'toto'];
model.grantTypeAllowed = function (clientId, grantType, callback) {

  if (grantType === 'password') {
    return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
  }
  callback(false, true);
};

model.saveAccessToken = function (token, clientId, expires, userId, callback) {
//console.log("Manas=>"+userId.id);
  var accessToken = new OAuthAccessTokensModel({
    accessToken: token,
    clientId: clientId,
    userId: userId.id,
    expires: expires
  });

  accessToken.save(callback);
};

/*
 * Required to support password grant type
 */

 //umakant

model.getUser = function (username, password, callback) { //, emailVerification:1
 
  OAuthUsersModel.findOne({ username: username, password: password}, function(err, user) {

    if(err) return callback(err);
    callback(null, user);
  });
};

/*
 * Required to support refreshToken grant type
 */
 
model.saveRefreshToken = function (token, clientId, expires, userId, callback) {
  var refreshToken = new OAuthRefreshTokensModel({
    refreshToken: token,
    clientId: clientId,
    userId: userId.id,
    expires: expires
  });

  refreshToken.save(callback);
};

model.getRefreshToken = function (refreshToken, callback) {
  console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

  OAuthRefreshTokensModel.findOne({ refreshToken: refreshToken }, callback);
};
