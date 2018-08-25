'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Facilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facilityName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      gymId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Gyms',
          key: 'id',
          as: 'gymId'
        }
      }
    }),
  down: (queryInterface) =>
    queryInterface.dropTable('Facilities'),
};