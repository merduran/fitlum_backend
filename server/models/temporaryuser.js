'use strict';
module.exports = (sequelize, DataTypes) => {
  var TemporaryUser = sequelize.define('TemporaryUser', {
    email: DataTypes.STRING,
    hash: DataTypes.STRING,
    totpKey: DataTypes.STRING
  }, {});
  TemporaryUser.associate = function(models) {
    // associations can be defined here
  };
  return TemporaryUser;
};