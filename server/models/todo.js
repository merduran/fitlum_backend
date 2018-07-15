'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    mal: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    ma2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.hasMany(models.TodoItem, {
    	// adds foreign key to target so todo items.
    	foreignKey: 'todoId',
    	// getter is todo.getTodoItems()
    	// everytime a todo is queried, its todo items will be included
    	// under key 'todoItems'
    	as: 'todoItems'
    });
  };
  return Todo;
};