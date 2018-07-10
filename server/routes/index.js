// const todosController = require('../controllers').todos;
// const todoItemsController = require('../controllers').todoitems;
const usersController = require('../controllers').users;
module.exports = (app) => {

	// app.get('/api', (req, res) => {
	// 	res.status(200).send({
	// 		message: 'Welcome amigo'
	// 	});
	// });
	// app.post('/api/todos', todosController.create);
	// app.get('/api/todos/:todoId/items', todoItemsController.create);
	app.post('/api/create_user', usersController.create)
	app.get('/api/get_users', usersController.list)

}