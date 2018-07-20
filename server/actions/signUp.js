const Users = require('../models').UserAlternative;
const createUser = (email, hash) => {
	// console.log("creating user biatch")
	return Users
		.create({
			email: email,
			hash: hash
		})
		.catch(error => {
			throw error;
		});
};

module.exports = { createUser };
