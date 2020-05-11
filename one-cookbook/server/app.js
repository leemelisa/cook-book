// create express server
const express = require('express');
const app = express();
const PORT = 9000;

// attaching the following middleware
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

// attaching the following routes
var router = require('./routes/testapi');
var recipeRouter = require('./routes/recipe');

app.use(cors());
app.use(bodyParser.json());

// connect routes to our application
app.use('/', router);
app.use('/recipe', recipeRouter);

// connect mongodb with mongoose
mongoose.connect(
    'mongodb://127.0.0.1:27017/onecookbook', 
    { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// server is listening on port 9000
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
