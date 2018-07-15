const User = require('../models').User;
console.log("user table = ", User)
module.exports = {
  	create(req, res) {
  	console.log("req.body = ", req.body);
	    return User
	    .create({
	      	email: req.body.email,
	     	password: req.body.password
	    })
	    .then(user => console.log("user = ", user))
	    .catch(error => console.log("ANGRY = ", error));
    },
	list(req, res){
		return User
		.all()
		.then(todos => res.status(201).send(todos))
		.catch(error => res.status(400).send(error))
	}

};