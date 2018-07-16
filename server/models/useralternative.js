'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserAlternative = sequelize.define('UserAlternative', {
    email: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {});
  UserAlternative.associate = function(models) {
    // associations can be defined here
  };
  return UserAlternative;
};