'use strict';
module.exports = (sequelize, DataTypes) => {
  var TodoItem = sequelize.define('TodoItem', {
    content: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    complete: {
    	type: DataTypes.BOOLEAN,
    	defaultValue: false,
    },
  });
  TodoItem.associate = function(models) {
    // associations can be defined here
    TodoItem.belongsTo(models.Todo, {
    	// Adds foreign key to source so to todo item.
    	foreignKey: 'todoId',
    	// If a todo is deleted, so are all of its associated todo items
    	onDelete: 'CASCADE',
    });
  };
  return TodoItem;
};