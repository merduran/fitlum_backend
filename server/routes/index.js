const usersController = require('../controllers').users;
// const todoItemsController = require('../controllers').todoitems;
// const usersController = require('../controllers').users;
// console.log("usersController.create = ", usersController.create);
// console.log("usersController.list = ", usersController.list);
module.exports = (app) => {

	app.get('/api', (req, res) => {
		res.status(200).send({
			message: 'ANNENo'
		});
	});
	app.post('/api/create_user', usersController.create)
	app.get('/api/get_users', usersController.list)
	// app.post('/api/create_user', todosController.list)
	// app.get('/api/get_users', todosController.list)
// create_user
}