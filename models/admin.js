const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const adminSchema = new Schema({
    un : {type:String,required:true},
    pw : {type:String,required:true}
});

const Admins = model('admins',adminSchema,'admins');
module.exports = Admins;