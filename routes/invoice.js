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

    let { invoiceno, invoicedate, customername, customeraddress, invoiceprice, invoicetax, invoicetotal } = req.body;

    Invoice.create({
      invoiceno, 
      invoicedate, 
      customername, 
      customeraddress,  
      invoicetax, 
      invoicetotal
    })
    .then(invoice => res.redirect('/invoices'))
    .catch(err => console.log(err))
})

//show single invoice
router.get('/:id', (req, res) => { 

  Invoice.findOne({
    where:{id : req.params.id }
  })
  .then(invoice => {
    res.render('view', {
     invoice
  })})
})

router.get('/delete/:id', (req, res) => { 

  Invoice.destroy({
    where:{id : req.params.id }
  })
  .then(invoice => {
    res.redirect('/invoices')
  })

})
module.exports = router;