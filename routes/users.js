const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonWebToken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.get('/all', (req, res, next) => {
	User.getallUser((err, user) => {
		if(err) throw err;
		return res.json(users);
	});
});

router.post('/register', (req, res, next) => {
	let newUser = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		dateofbirth: req.body.dateofbirth,
		address : {
			street: req.body.street,
			city: req.body.city,
			state: req.body.state,
			country: req.body.country,
			zipcode: req.body.zipcode
		},
		phonenumber: req.body.phonenumber,
		email: req.body.email,
		password: req.body.password
	});
	console.log(newUser);
	User.addUser(newUser, (err, user) => {
		if(err){
			res.json({success: false, msg: 'Failed to register'});
		}
		else{
			res.json({success: true, msg: 'user registered'});
		}
	});
});

//Authetication
router.post('/authentication', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	User.getUserByEmail(email, (err, user) => {
		if(err) throw err;
		if(!user){
			return res.json({success: false, msg: 'User not found'});
		}
		console.log("userFound");
		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign(user, config.secret, {
					expiresIn: 604800 //1 Week
				});
				res.json({
					success: true,
					token: 'JWT '+token,//The space between JWT +token is important
					user: {
						id: user.id,
						name: user.name,
						email: user.email
					}
				});
			}
			else{
				return res.json({success: false, msg: 'Wrong Password'});
			}
		});
	});
});

//Search User by Username
router.post('/serchByEmail', (req, res, next) => {
	const email = req.body.email;

	User.getUserByEmail(email, (err, user) => {
		if(err) throw err;
		return res.json(user);
	});
});

router.get('/serchById/:id', (req, res, next) => {
	const id = req.params.id;

	User.getUserById(id, (err, user) => {
		if(err) throw err;
		return res.json(user);
	});
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
	res.json({user: req.user});
});

module.exports = router;