const Users = require('../models').UserAlternative;
const createUser = (email, password) => {
	console.log("Creating User")
	return Users
		.create({
			email: email,
			password: password
		})
		.catch(error => {
			// console.log("error = ", error)
			throw error;
		});
};

module.exports = { createUser };
