'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', 

    // return queryInterface.changeColumn('Users', 'email', {
    //   allowNull: false,
    //   unique: true,
    //   type: Sequelize.STRING
    // });
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      hash: {
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
    }
  )},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};