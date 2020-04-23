const express = require('express');

const Projects = require('../models/project');
const checktoken = require('../middleware/check-token'); 

var Routes = express();

Routes.get('/',async(req,res,next)=>{
    try{
    var data = await Projects.find();
    res.send(data);
    }
    catch(err)
    {
        res.status(404).json({
            "message":err
        });
    }

});

Routes.post('/',checktoken,async(req,res,next)=>{
    try{
        data = await Projects.find({slug:req.body.slug});
        if(data.length == 0)
        {
            await Projects.create(req.body);
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
            "message":err
        });
    }

});

Routes.delete('/',checktoken,async(req,res,next)=>{
    try{
    await Projects.deleteOne({slug:req.body.slug});
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

Routes.patch('/',checktoken,async(req,res,next)=>{
    try{
    await Projects.updateOne({slug:req.body.slug},req.body);
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


module.exports = Routes;