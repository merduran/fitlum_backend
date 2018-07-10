const User = require('../models').User;

module.exports = {
	create(req, res){
		return User
		.create({
			email: req.body.email,
			password: req.body.password,
		})
		.then(todo => res.status(201).send(todo))
		.catch(error => res.status(400).send(error))
	},
	list(req, res){
		return User
		.all()
		.then(todos => res.status(201).send(todos))
		.catch(error => res.status(400).send(error))
	}
}