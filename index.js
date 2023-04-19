const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const cors = require('cors');

const app = express();

//middleware
app.use(cors())
app.use(bodyParser.json());
app.use('/upload', express.static('upload')); //to know that the url /upload is point to the upload folder
app.use('/api',routes);


//connect to db
mongoose.connect('mongodb+srv://lwinkoko:newnext@newnext.izinkhj.mongodb.net/?retryWrites=true&w=majority')
        .then(()=>{
            //listen
            app.listen(()=>{
                console.log("Server is started and connected to database successfully!");
            })
        }).catch((error) => {
            console.log(error);
        })


module.exports = app;
