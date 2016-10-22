var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  username:  String,
  email: String, 
  password: String, 
  date: { type: Date, default: Date.now },
});

mongoose.model('User', usersSchema);



/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    name: {type:String, required: [true, 'Username cannot be blank'], unique:true}, 
    password: String, 
})); */
