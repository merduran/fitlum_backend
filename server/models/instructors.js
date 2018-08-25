'use strict';
module.exports = (sequelize, DataTypes) => {
  var Instructors = sequelize.define('Instructors', {
    instructorName: DataTypes.STRING,
    phone: DataTypes.STRING,
    specialty: DataTypes.STRING,
    rating: DataTypes.DOUBLE
  }, {});
  Instructors.associate = (models) => {
    // associations can be defined here
    Instructors.hasMany(models.Classes, {
      foreignKey: 'classId',
      as: 'givenClasses'
    }),
    Instructors.belongsToMany(models.Gyms, {
      foreignKey: 'gymId',
      as: 'gym'
    }),
  };
  return Instructors;
};