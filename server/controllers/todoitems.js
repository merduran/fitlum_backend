const TodoItems = require('../models').TodoItem;

module.exports = {
	create(req, res){
		console.log("todoId = ", req.params.todoId)
		return TodoItems
		.create({
			content: 'ANNEN',
		})
		.then(todoitems => res.status(200).send(todoitems))
		.catch(error => res.status(400).send(error));
	},
	list(req, res){
		return TodoItems
		.all()
		.then(todoitems => res.status(200).send(todoitems))
		.catch(error => res.status(400).send(error));
	}
}