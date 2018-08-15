const PermanentUsers = require('../models').UserAlternative;
const TemporaryUsers = require('../models').TemporaryUser;
console.log("temp user model = ", TemporaryUsers)
const createPermanentUser = (email, hash) => {
	return PermanentUsers
		.create({
			email: email,
			hash: hash
		})
		.catch(error => {
			throw error;
		});
};

const isUsernameTaken = (email) => {
	return PermanentUsers
		.findAndCountAll({
			where: {
				email: email
			},
			limit: 1,
		})
		.catch(error => { throw error })
}

const createTempUser = (email, hash, totpKey) => {
	console.log("email, hash, totpKey = ", email, hash, totpKey)
	return TemporaryUsers
		.create({
			email: email,
			hash: hash,
			totpKey: totpKey
		})
		.catch(error => {
			console.log("error creating temp user = ", error)
			throw error;
		});
};

const findTempUser = (email) => {
	return TemporaryUsers
		.find({
			where: {
				email: email
			}
		})
}

module.exports = { createPermanentUser, isUsernameTaken, createTempUser, findTempUser };
