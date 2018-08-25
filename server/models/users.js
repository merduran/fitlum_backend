'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    username: DataTypes.STRING,
    schedule: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    mobilePlatform: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.belongsToMany(models.Classes, {
      foreignKey: 'classId',
      as: 'attendedClasses'
    }),
    Users.belongsToMany(models.Gyms, {
      foreignKey: 'gymId',
      as: 'frequentGym'
    }),
  };
  return Users;
};