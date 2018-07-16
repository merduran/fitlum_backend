'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('UserAlternatives', 'email', {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    });
  //   return queryInterface.createTable('UserAlternatives', {
  //     id: {
  //       allowNull: false,
  //       autoIncrement: true,
  //       primaryKey: true,
  //       type: Sequelize.INTEGER
  //     },
  //     email: {
  //       unique: true,
  //       type: Sequelize.STRING
  //     },
  //     hash: {
  //       type: Sequelize.STRING
  //     },
  //     createdAt: {
  //       allowNull: false,
  //       type: Sequelize.DATE
  //     },
  //     updatedAt: {
  //       allowNull: false,
  //       type: Sequelize.DATE
  //     }
  //   });
  // },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserAlternatives');
  }
};