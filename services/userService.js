module.exports = {
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	dateofbirth: {
		type: Date
	},
	address: {
		street : { String },
		city : { String },
		state : { String },
		zipcode : { Number }
	},
	phonenumber: {
		type: Number
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	}
}
