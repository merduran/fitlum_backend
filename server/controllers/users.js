const User = require('../models').UserAlternative;
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
		return User
		// sync()
		// .destroy({
		// 	truncate: true,
		// 	where: {}
		// })
		// .then(users => res.status(201).send(users))
		// .catch(error => res.status(400).send(error))
		.all()
		.then(users => res.status(201).send(users))
		.catch(error => res.status(400).send(error))

	},
	findUserById(req, res){
		return User
		.findOne({where: {id: 'req.'}})
	}


};