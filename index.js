const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const cors = require('cors');

const app = express();

//middleware
//app.use(cors({ origin: ['http://new-next-server.onrender.com', 'https://new-next-server.onrender.com'], credentials: true }))
app.use(function(req, res, next) {
    const allowedOrigins = ['http://localhost:3000', 'http://new-next-server.onrender.com', 'https://new-next-server.onrender.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE, PATCH");
    next();
  });
app.use(bodyParser.json());
app.use('/upload', express.static('upload')); //to know that the url /upload is point to the upload folder
app.use('/api',routes);


//connect to db
mongoose.connect('mongodb+srv://lwinkoko:newnext@newnext.izinkhj.mongodb.net/?retryWrites=true&w=majority')
        .then(()=>{
            //listen
            app.listen(4000,()=>{
                console.log("Server is started and connected to database successfully!");
            })
        }).catch((error) => {
            console.log(error);
        })


module.exports = app;
