const jwt = require('jwt-simple');
const config = require('../../config');
const { createUser } = require('../actions/signUp.js');
const bcrypt = require('bcrypt');

const tokenForUser = (user) => {
	const timestamp = new Date().getTime() - 4 * 60 * 60 * 1000;
	const exp = new Date().getTime() + - 4 * 59 * 60 * 1000
	console.log("timestamp = ", new Date(timestamp), ", exp = ", new Date(exp));
	return jwt.encode({ sub: user.id, iat: timestamp, exp: exp }, config.secret);
};

const signIn = (req, res, next) => {
	// console.log("SIGNING IN BIACTH = ");
	res.send({ token: tokenForUser(req.user) });
};

const signUp = (req, res, next) => {
	// console.log("SIGNING UP BIACTH");
	const { email, password } = req.body;
	const saltRounds = 12
	if (!email || !password){
		res.status(442).send({ error: 'You must provide an email and a password.' });
	}
	bcrypt.hash(password, saltRounds)
		.then((hash) => {
			return createUser(email, hash)
				.then((newUser) => {
					res.json({ token: tokenForUser(newUser) })
				})
				.catch((err) => {
					res.json({ error: 'db error: most likely email already in use!'})
				})
		})
		.catch((err) => {
			return next(err)
		})
};

module.exports = { signIn, signUp };