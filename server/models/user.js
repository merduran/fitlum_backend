'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
  	email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
	// indexes: [
 //        {
 //            unique: true,
 //            fields: ['email']
 //        }
 //    ]
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};