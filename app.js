const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log("conncted");
});

const app = express();
const port = 3000;

const users = require('./routes/users');

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//BodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Routing Liks
//app.get('/', (req, res) => {
 // res.send('Invalid Endpoint');
//})

app.use('/users', users);

//Assign Port
app.listen(port, () => {
  console.log('Server started at port:'+port);
})
