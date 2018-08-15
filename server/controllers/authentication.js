const jwt = require('jwt-simple');
const config = require('../../config');
const { createPermanentUser, isUsernameTaken, createTempUser, findTempUser } = require('../actions/signUp.js');
const bcrypt = require('bcrypt');
const moment = require('moment');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

const tokenForUser = (user) => {
	const timestamp = moment().valueOf() / 1000;
	const expires = moment().add(120, 'seconds').valueOf() / 1000;
	return jwt.encode({ exp: expires, sub: user.id, iat: timestamp }, config.secret);
};

const signIn = (req, res, next) => {
	res.send({ token: tokenForUser(req.user) });
};

const signUpTempUser = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(442).send({ error: 'You must provide an email and a password.' });
	}
	isUsernameTaken(email)
		.then((existingUsername) => {
			// console.log("existingUsername = ", existingUsername); 
			if (existingUsername.count) {
				res.json({ error: 'db error: most likely email already in use!'})
			} else {
				// console.log("annen bebegim")
				const saltRounds = 12
				bcrypt.hash(password, saltRounds)
					.then((hash) => {
						var totpKey = speakeasy.generateSecret({ length: 20 });
						// console.log("totpKey = ", totpKey, ", hash = ", hash);
						createTempUser(email, hash, totpKey.base32)
							.then((newTempUser) => {
								// console.log("secret = ", newTempUser.totpKey);
								var totpToken = speakeasy.totp({
								  secret: newTempUser.totpKey.base32,
								  encoding: 'base32'
								});
								// console.log("totp token = ", totpToken)
								sendVerificationMail(req, res, newTempUser.email, totpToken)
								res.json({ token: tokenForUser(newTempUser) })
							})
							.catch((err) => {
								res.json({ error: 'db error: most likely email already in use!'})
							})
					})
					.catch((err) => {
						return next(err)
					})
			}
		});
};

const signUpPermanentUser = (req, res, next) => {
	// console.log("req.body = ", req.body);
	findTempUser(req.body.email)
		.then((tempUser) => {
			// console.log("tempUser = ", tempUser)
			var tokenValidates = speakeasy.totp.verify({
				secret: tempUser.totpKey,
				encoding: 'base32',
				token: req.body.totpCode,
				// window: 6
			});
			var totpToken = speakeasy.totp({
				secret: tempUser.totpKey,
				encoding: 'base32'
			});
			console.log("tempUser.totpKey = ", tempUser.totpKey);
			console.log("totpToken = ", totpToken);
			console.log("tokenValidates = ", tokenValidates);
			// return createPermanentUser(tempUser.email, tempUser.hash, tempUser.totpKey)
			// 	.then((newUser) => {
			// 		var token = tokenForUser(newUser);
			// 		console.log("token assigned = ", token)
			// 		res.json({ token: token });
			// 	})					
			// 	.catch((err) => {
			// 		res.json({ error: 'db error: most likely email already in use!'})
			// 	})
		});
}

// const verifyTotpToken = (req, res) => {

// 	var tokenValidates = speakeasy.totp.verify({
// 	  secret: secret.base32,
// 	  encoding: 'base32',
// 	  token: '123456',
// 	  window: 6
// 	});
// }

const sendVerificationMail = (req, res, email, totpToken) => {
    var smtpTransport = nodemailer.createTransport({
    	service: 'Gmail',
    	auth: {
    		user: 'brownrecreationalsportsapp@gmail.com',
    		// Is this safe amk? WTF? Factor to separate file to never push?!?!?!?
    		pass: 'FEm-2Qs-nby-BMn'
    	}
    });
    mailOptions = {
        to : 'murat_erduran@brown.edu',
        subject : "Confirming your Fitlum account",
        html : "Hello,<br> Please enter the following code in the Fitlum app to confirm your account.<br>" + totpToken 
    };
    smtpTransport.sendMail(mailOptions, function(error){
	    if (error){
	    	// Handle error; resend Mail?
	        console.log(error);
	    } else {
	    	console.log("Message sent successfully");
	    }
	});
}

module.exports = { signIn, signUpTempUser, signUpPermanentUser };