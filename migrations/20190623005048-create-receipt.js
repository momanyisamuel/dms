'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Receipts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING
      },
      customeraddress: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.INTEGER
      },
      paymentType: {
        type: Sequelize.STRING
      },
      branch: {
        type: Sequelize.STRING
      },
      attendingDoctor: {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Receipts');
  }
};