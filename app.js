const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('connecting', () => {
    console.log('Connecting to the Database...');
})

// If the connection to the db is established
db.on('connected', () => {
    console.log('Mongoose connection established!');
    //console.log('Currently established connections: ' + mongoose.connections.length);
})

// If the connection throws an error
db.on('error', (err) => {  
    console.log('Mongoose default connection error: ' + err);
});

// If the connection has reconnected
db.on('reconnect', () => {  
    console.log('Mongoose connection reconnected!');
});

// If the connection has closed
db.on('close', () => {  
    console.log('Mongoose connection closed!');
});

//apply body-parser middleware to express
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

//all routes
const indexRoutes = require('./Routes/indexRoutes');
const usersRoutes = require('./Routes/usersRoutes');

//use routes
app.use('/api', indexRoutes);
app.use('/api/users', usersRoutes);

//we check if we have PORT already declared in process.env otherwise we use 5000
const PORT = process.env.PORT || 5000;

//node index => launches server on port 5000
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
