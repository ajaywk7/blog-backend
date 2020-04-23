const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const db = require('./config/db');

const postRoutes = require('./routes/postRoutes');
const ProjRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/auth');

const port = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyparser.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(db.url,{useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log('connected to mongo db');
}).catch((err)=>{
    console.log('cannot connect to mon');
});


app.use('/posts',postRoutes);
app.use('/projects',ProjRoutes);
app.use('/auth',authRoutes);

app.listen(port,()=>{
    console.log("server connected");
})