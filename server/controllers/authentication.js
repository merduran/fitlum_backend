const jwt = require('jwt-simple');
const config = require('../../config');
const { createUser } = require('../actions/signUp.js');
const bcrypt = require('bcrypt');
const moment = require('moment');

const tokenForUser = (user) => {
	const timestamp = moment().valueOf() / 1000;
	const expires = moment().add(120, 'seconds').valueOf() / 1000;
	return jwt.encode({ exp: expires, sub: user.id, iat: timestamp }, config.secret);
};

const signIn = (req, res, next) => {
	res.send({ token: tokenForUser(req.user) });
};

const signUp = (req, res, next) => {
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