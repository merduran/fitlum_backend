const Users = require('../models').UserAlternative;

const findUserById = (id) => {
	const query = 'SELECT * FROM "Users" WHERE id=$1';
	return Users.oneOrNone(query, [id]);
};

const verifyUser = (email) => {
	const query = 'SELECT * FROM "Users" WHERE email=$1';
	return Users.oneOrNone(query, [email]);
};

module.exports = { findUserById, verifyUser };
