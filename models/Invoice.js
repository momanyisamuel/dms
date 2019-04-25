const Sequelize = require('sequelize');
const db = require('../config/database');

const Invoice = db.define('invoice', {
   
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

module.exports = Invoice;