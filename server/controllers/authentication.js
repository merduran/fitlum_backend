const jwt = require('jwt-simple');
const config = require('../../config');
const { createUser } = require('../actions/signUp.js');
const bcrypt = require('bcrypt');

const tokenForUser = (user) => {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

const signIn = (req, res, next) => {
	var token = tokenForUser(req.user);
	res.send({ token: token });
};

const signUp = (req, res, next) => {
	const { email, password } = req.body;
	console.log(req.body)
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
					res.json({ error: 'Database error!'})
				})
		})
		.catch((err) => {
			return next(err)
		})
};

module.exports = { signIn, signUp };