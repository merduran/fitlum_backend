'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      areaName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      numberOfPeople: {
        type: Sequelize.INTEGER
      },
      equipments: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      facilityId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Facilities',
          key: 'id',
          as: 'facilityId'
        }
      }
    }),
  down: (queryInterface) =>
    queryInterface.dropTable('Areas'),
};