'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hash: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      schedule: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobilePlatform: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      sex: {
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
      },
      classId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Classes',
          key: 'id',
          as: 'classId'
        }
      }
    }),
  down: (queryInterface) =>
    queryInterface.dropTable('Users'),
};