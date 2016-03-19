/* ES 5 syntax*/
// get an instance of mongoose
var mongoose = require('mongoose');

// NOTE: DON'T USE THIS!!! We will encrypt the password in other parts.
// The clear password is just to get you up with as little 
// complications as possible

//  and mongoose.Schema
var userSchema = new mongoose.Schema({
	userName: String, 
    userPassword: String, // NOTE: DON'T USE THIS!!!
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);