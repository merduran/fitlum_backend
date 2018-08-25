'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Gyms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gymName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      email: {
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
  down: (queryInterface) =>
    queryInterface.dropTable('Gyms'),
};