const Sequelize = require('sequelize');
const db = require('../config/database');

const Invoice = db.define('invoice', {
   
    date: {
        type: Sequelize.STRING
    },
    cost: {
        type: Sequelize.INTEGER
    },
    invoiceno: {
        type: Sequelize.STRING
    },
    item: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    }
})

module.exports = Invoice;