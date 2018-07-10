'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // User.associate = function(models) {
  //   // associations can be defined here
  //   Todo.hasMany(models.TodoItem, {
  //   	// adds foreign key to target so todo items.
  //   	foreignKey: 'todoId',
  //   	// getter is todo.getTodoItems()
  //   	// everytime a todo is queried, its todo items will be included
  //   	// under key 'todoItems'
  //   	as: 'todoItems'
  //   });
  // };
  return User;
};