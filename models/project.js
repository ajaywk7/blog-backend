const mongoose = require('mongoose');
const Schema = mongoose.Schema
const model = mongoose.model

var projectSchema = new Schema({
    image: {type:String, default:''},
	title: {type:String, default:'', display:true ,required:true},
	preview: {type:String, default:'', trim:true},
	category: {type:String, default:'', lowercase:true, trim:true},
	text: {type:String, default:'', isHtml:true,required:true } ,
	author: {type:Object, default:{}, immutable:true,required:true},
	slug: {type:String, default:'', immutable:true},
	dateString: {type:String, default:'', immutable:true},
    timestamp: {type:Date, default: new Date(), immutable:true},
    gitlink:{type:String}
})

const Projects = model('projects',projectSchema,'projects');
module.exports = Projects;