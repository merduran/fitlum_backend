const Users = require('../models').UserAlternative;

const findUserById = (id) => {
	return Users
		.findOne({where: {id: id}})
		.catch(error => {
			throw error;
		});
	
	// return Users.oneOrNone(query, [id]);
};

const verifyUser = (email) => {
	// console.log("YA = ", email)
	return Users
		// .destroy({
		// 	where: {},
		// 	truncate: true
		// })
		.findOne({where: {email: email}})
		.catch(error => {
			// console.log("error verfying user = ")
			throw error;
		});
	// const query = 'SELECT * FROM "Users" WHERE email=$1';
	// return Users.oneOrNone(query, [email]);
};

module.exports = { findUserById, verifyUser };
