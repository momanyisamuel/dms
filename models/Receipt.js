const Sequelize = require('sequelize');
const db = require('../config/database');

const Receipt = db.define('receipt', {
   
    invoiceno: {
        type: Sequelize.STRING
    },
    invoicedate: {
        type: Sequelize.DATE
    },
    customername: {
        type: Sequelize.STRING
    },
    customeraddress: {
        type: Sequelize.STRING
    },
    invoiceprice: {
        type: Sequelize.STRING
    },
    invoicetax: {
        type: Sequelize.STRING
    },
    invoicetotal: {
        type: Sequelize.STRING
    }
})

module.exports = Receipt;