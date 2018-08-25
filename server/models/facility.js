'use strict';
module.exports = (sequelize, DataTypes) => {
  var Facility = sequelize.define('Facility', {
    facilityName: DataTypes.STRING,
    description: DataTypes.STRING,
    sports: DataTypes.STRING,
  }, {});
  Facility.associate = (models) => {
    // associations can be defined here
    Facility.belongsTo(models.Gyms, {
      foreignKey: 'gymId',
      onDelete: 'CASCADE',
    }),
    Facility.hasMany(models.Areas, {
      foreignKey: 'areaId',
      as: 'attendedClasses'
    }),
  };
  return Facility;
};