'use strict';
module.exports = (sequelize, DataTypes) => {
  var Gyms = sequelize.define('Gyms', {
    gymName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Gyms.associate = function(models) {
    // associations can be defined here
    Gyms.hasMany(models.Classes, {
      foreignKey: 'classId',
      as: 'classes'
    }),
    Gyms.hasMany(models.Users, {
      foreignKey: 'userId',
      as: 'members'
    }),
  };
  return Gyms;
};