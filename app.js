//import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

//create express app variable
const app = express();

//define port number
const port = 3000;

//create mongodb connection
mongoose.connect('mongodb://localhost:27017/unitoq', { useNewUrlParser: true});

//on successful connection
mongoose.connection.on('connected', function(){
    console.log('Connected to database mongodb @ port:27017');
});

//if error occurs
mongoose.connection.on('error', function(err){
    if(err)
        console.log('Error in database connection: '+err);
});

//import routes file
const route = require('./routes/routes.js')

//implement middleware - CORSapp.use(cors());

//implement body-parser middleware to parse json data
app.use(bodyparser.json());

//use the imported routes file by implementing route level middleware
app.use('/api', route)

//link static files to the application
app.use(express.static(path.join(__dirname, 'public')));

//testing server
app.get('/', function(req, res){
   res.send('Server running') 
});

//bind port number with server
app.listen(3000, function(){
    //successfull connection message
    console.log('Server started at port no.:',port);
});