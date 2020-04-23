const express = require('express');
const Admins = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = require('../config/auth');
const Routes = express()

const hash = async(password) => {
    return await bcrypt.hash(password,10);
}

const match = async(password,hash) =>{
    return await bcrypt.compare(password,hash);
}

const createToken = async(un) => {
    return jwt.sign({
        un : un
    },secret,{
        expiresIn:"1h"
    }
    );
}

/* for administration use
Routes.post('/',async(req,res,next)=>{
    try
    {
            req.body.pw =await hash(req.body.pw);
            await Admins.create(req.body);
            res.status(200).json({
                "message" : "successful"
            });
    }
    catch(err)
    {
        console.log(err);
        res.status(404).json({
            "message":err
        });
    }
}); */

Routes.post('/login',async(req,res,next)=>{
    try
    {
            var data =await Admins.findOne({un:req.body.un});
            if(data.length != 0)
            {
                const checkMatch = await match(req.body.pw,data.pw);
                if(checkMatch)
                {
                    const token = await createToken(data.un);
                    res.status(200).json({
                        "message" : "auth success",
                        "token":token
                    });
                }
                else
                {
                    throw new Error();
                }
            }
            
    }
    catch(err)
    {
        console.log(err);
        res.status(404).json({
            "message":"Auth failure"
        });
    }
});

module.exports = Routes;