'use strict';
module.exports = (sequelize, DataTypes) => {
  var Gyms = sequelize.define('Gyms', {
    gymName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Gyms.associate = (models) => {
    // associations can be defined here
    Gyms.hasMany(models.Classes, {
      foreignKey: 'classId',
      as: 'classes'
    }),
    Gyms.hasMany(models.Users, {
      foreignKey: 'userId',
      as: 'members'
    }),
    Gyms.hasMany(models.Instructors, {
      foreignKey: 'instructorId',
      as: 'instructors'
    }),
  };
  return Gyms;
};