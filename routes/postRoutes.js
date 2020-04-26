const express = require('express');
const checktoken = require('../middleware/check-token'); 

const Posts = require('../models/post');

var postRoutes = express();

postRoutes.get('/',async(req,res,next)=>{
    try{
    var data = await Posts.find();
    res.send(data);
    }
    catch(err)
    {
        res.status(404).json({
            "message":err
        });
    }

});

postRoutes.get('/category/',async(req,res,next)=>{
    try{
    var data = await Posts.find({category:req.body.category});
    res.send(data);
    }
    catch(err)
    {
        res.status(404).json({
            "message":err
        });
    }

});

postRoutes.post('/',checktoken,async(req,res,next)=>{
    try{
    data = await Posts.find({slug:req.body.slug});
    if(data.length == 0)
    {
        await Posts.create(req.body);
        res.status(200).json({
            "message" : "successful",
            "data":req.body
        });
    }
    else{
        throw new Error("failed");
    }
    }
    catch(err)
    {
        res.status(404).json({
            "message":"failed"
        });
    }

});

postRoutes.delete('/',checktoken,async(req,res,next)=>{
    try{
    await Posts.deleteOne({slug:req.body.slug});
    res.status(200).json({
        "message" : "successfully updated"
    });
    }
    catch(err)
    {
        res.status(404).json({
            "message":"failed"
        });
    }

});

postRoutes.patch('/',checktoken,async(req,res,next)=>{
    try{
    await Posts.updateOne({slug:req.body.slug},req.body);
    res.status(200).json({
        "message" : "successfully updated"
    });
    }
    catch(err)
    {
        res.status(404).json({
            "message":err
        });
    }

});


module.exports = postRoutes;