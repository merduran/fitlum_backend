const User = require('../models').UserAlternative;
const TempUser = require('../models').TempUser;
module.exports = {
  	createUser(req, res) {
	    return User
	    .create({
	      	email: req.body.email,
	     	password: req.body.password
	    })
	    .then(user => res.status(201).send(user))
	    .catch(error => res.status(400).send(error));
    },
	listAllUsers(req, res){
		return TempUser
		// sync()
		// .destroy({
		// 	truncate: true,
		// 	where: {}
		// })
		// .then(users => res.status(201).send(users))
		// .catch(error => res.status(400).send(error))
		.all()
		.then(users => res.status(201).send(users))
		.catch(error => console.log(error))

	},
	// findUserById(req, res){
	// 	console.log("req = ", req)
	// 	return User
	// 	.findOne({where: {id: 'req.'}})
	// }


};