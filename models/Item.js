const Sequelize = require('sequelize');
const db = require('../config/database');

const Item = db.define('invoiceitems', {
   
    invoiceid: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    price: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    taxrate: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    taxtotal: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    itemname: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
})

module.exports = Item;