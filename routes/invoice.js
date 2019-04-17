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
//display invoice form
router.get('/add', (req, res) => res.render('add'))

//add an invoice
router.post('/add', (req, res) => {

    let { invoiceno, date, item, cost, quantity } = req.body;

    Invoice.create({
        invoiceno, 
        date, 
        item, 
        cost, 
        quantity
    })
    .then(invoice => res.redirect('/invoices'))
    .catch(err => console.log(err))
})

//show single invoice
router.get('/:id', (req, res) => {

  const id = req.params.id

  Invoice.findAll({
    where:{id : id}
  }).then(invoice => {res.render('view', {
     invoice
  })})
})

module.exports = router;