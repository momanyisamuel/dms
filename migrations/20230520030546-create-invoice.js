'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      customername: {
        type: Sequelize.STRING
      },
      principalMember: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      customerAddress: {
        type: Sequelize.STRING
      },
      date: {
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
      fileNo: {
        type: Sequelize.STRING
      },
      membershipNumber: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices');
  }
};