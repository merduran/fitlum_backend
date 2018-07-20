const passport = require('passport');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { findUserById, verifyUser } = require('../actions/signIn');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	// console.log("verifying = ");
	return verifyUser(email)
		.then((validUser) => {
			// console.log("user valid? = ", validUser)
			if (validUser) {
				bcrypt.compare(password, validUser.hash)
				.then((validPassword) => {
					// console.log("is password valid = ", validPassword)
					if (validPassword) {
						// Successful local login
						// console.log("validPassword = ", validPassword)
						return done(null, validUser)
					}
					// Wrong password

					return done(null, false)
				})
				.catch(err => {
					// console.log("ERROR = ", err)
					done(err, false)
				})
			} else {
				// console.log("InvalidUser")
				// Email does not exist warning
			}
		})
		.catch((err) => console.log("ERIN = ", err))
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret,
};
// console.log("jwtOptions = ", jwtOptions.jwtFromRequest);
// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	console.log('payload = ', payload.sub)
	return findUserById(payload.sub)
		.then((foundUser) => {
			if (foundUser) {
				// console.log("foundUser = ", foundUser);
				return done(null, foundUser)
			}
			return done(null, false)
		})
		.catch(err => done(err, false))
});

passport.use(jwtLogin);
passport.use(localLogin);

