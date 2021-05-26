const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    password: String, 
});

const User = mongoose.model("User", userSchema);

exports.saveUser = function (inName, inPassword) {
    var user  = User({
        name: inName,
        password: inPassword,
    });

    user.save();
};

exports.getAllNameLists = async function () {
    return await User.find({});
}; 

exports.getPerson = async function(){
    return await User.find({})
};

exports.getUser = async function (uname) {
    return await User.findOne({name: uname})
};