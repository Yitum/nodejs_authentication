var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//set up the user schema
var userSchema = new Schema({
    
    local: {
        //name: [{ firstname: String, lastname: String}],
        name: { firstname: String, lastname: String},
        gender: String,
        date: { type: Date, default: Date.now },
        email: String,
        password: String
    }
});

//generate password to hash code
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//validate the input password
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);