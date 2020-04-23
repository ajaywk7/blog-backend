const mongoose = require('mongoose');
const Schema = mongoose.Schema
const model = mongoose.model

var postSchema = new Schema({
    image: {type:String, },
	title: {type:String, default:'', display:true ,required:true},
	preview: {type:String, default:'', trim:true},
	category: {type:String, default:'', lowercase:true, trim:true},
	text: {type:String, default:'', isHtml:true,required:true } ,
	author: {type:Object, default:{}, immutable:true,required:true},
	slug: {type:String, default:'', immutable:true},
	dateString: {type:String, default:'', immutable:true},
    timestamp: {type:Date, default: new Date(), immutable:true},
    youtube:{type:String}
})

const Posts = model('posts',postSchema,'posts');
module.exports = Posts;

/* 
    {
        "image" : "https://blog.hubspot.com/hubfs/how-to-write-a-blog-post.jpg",
        "title" : "How to write blog post ?",
        "preview" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        "category" : "sample",
        "text" : "<h1> hello world</h1>",
        "author":"bob",
        "slug" : "sample-post",
        "dateString" : "2020-02-02"
    }
*/