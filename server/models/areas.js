'use strict';
module.exports = (sequelize, DataTypes) => {
  var Areas = sequelize.define('Areas', {
    areaName: DataTypes.STRING,
    description: DataTypes.STRING,
    numberOfPeople: DataTypes.INTEGER,
    equipments: DataTypes.STRING,
    capacity: DataTypes.INTEGER
  }, {});
  Areas.associate = (models) => {
    // associations can be defined here
    Areas.belongsTo(models.Facility, {
      foreignKey: 'facilityId',
      onDelete: 'CASCADE',
    });
  };
  return Areas;
};