const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		min: 255,
		max: 6,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

const User = mongoose.model('jwt', userSchema, 'jwt'); //remove plural form
module.exports = User;
