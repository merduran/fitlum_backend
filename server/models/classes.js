'use strict';
module.exports = (sequelize, DataTypes) => {
  var Classes = sequelize.define('Classes', {
    className: DataTypes.STRING,
    sportCategory: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    instructor: DataTypes.STRING,
    spotsAvailable: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    keywords: DataTypes.STRING
  }, {});
  Classes.associate = (models) => {
    // associations can be defined here
    Classes.belongsTo(models.Gyms, {
      foreignKey: 'gymId',
      onDelete: 'CASCADE',
    }),
    Classes.belongsTo(models.Instructors, {
      foreignKey: 'instructorId',
      onDelete: 'CASCADE',
    }),
    Classes.hasMany(models.Users, {
      foreignKey: 'userId',
      as: 'users'
    }),
  };
  return Classes;
};