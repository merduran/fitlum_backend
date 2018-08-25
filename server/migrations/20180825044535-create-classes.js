'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      className: {
        type: Sequelize.STRING
      },
      sportCategory: {
        type: Sequelize.STRING
      },
      startTime: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.DATE
      },
      instructor: {
        type: Sequelize.STRING
      },
      spotsAvailable: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      keywords: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface/*, Sequelize*/) => 
    queryInterface.dropTable('Classes'),
};