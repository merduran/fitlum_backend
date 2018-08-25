'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
  queryInterface.createTable('Instructors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      instructorName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      specialty: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.DOUBLE
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
     queryInterface.dropTable('Instructors'),
};