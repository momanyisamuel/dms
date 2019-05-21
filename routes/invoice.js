const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Invoice = require('../models/Invoice');
const Item = require('../models/Item');
const puppeteer = require('puppeteer');


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

    let { invoiceno, 
      invoicedate, 
      customername, 
      customeraddress, 
      invoicetax, 
      invoicetotal,
      invoiceitem,
      price,
      quantity,
      taxtotal } = req.body;

    Invoice.create({
      invoiceno, 
      invoicedate, 
      customername, 
      customeraddress,  
      invoicetax, 
      invoicetotal
    })
    .then(function(invoice){
        console.log(invoice.id)
        Item.create({
          invoiceid : invoice.id,
          invoiceitem,
          price,
          quantity,
          taxtotal
        })
        res.redirect('/invoices')
    })
    .catch(err => console.log(err))
})

//show single invoice
router.get('/:id', (req, res) => { 

  Invoice.findOne({
    where:{id : req.params.id }
  })
  .then(invoice => {
    res.render('view', {
     invoice, layout: false
  })})
})

router.get('/:id/pdf',(req,res) => {
    (async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        const id = req.params.id
        await page.goto('http://localhost:8000/invoices/'+id, {waitUntil: 'networkidle0'}) //invoices/:id/
        const buffer = await page.pdf({format: 'A4'}) //configurations

        res.type('application/pdf')
        res.send(buffer)

        browser.close()
    })()
})

//edit single invoice
router.get('/edit/:id', (req, res) => { 

  Invoice.findOne({
    where:{id : req.params.id }
  })
  .then(invoice => {
    res.render('edit', {
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