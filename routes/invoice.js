const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Invoice = require('../models/Invoice');


router.get('/', (req,res) => 
Invoice.findAll()
.then( invoice => {
    res.render('invoice', {
        invoice
    })
  })
  .catch(err => {
    console.log( err);
  })
)

//add an invoice
router.get('/add', (req, res) => {
    const data = {
        id:"1",
        invoiceno : "#56876",
        date:"12/08/2018",
        item: "Tooth removal",
        cost:"650",
        quantity:"1"
    }

    let { id, invoiceno, date, item, cost, quantity } = data;
    Invoice.create({
        id,
        invoiceno, 
        date, 
        item, 
        cost, 
        quantity
    })
    .then(invoice => res.redirect('/invoices'))
    .catch(err => console.log(err))
})

module.exports = router;