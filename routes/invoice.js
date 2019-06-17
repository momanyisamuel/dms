const express = require('express');
const router = express.Router();
const models = require('../models');
const puppeteer = require('puppeteer');
const sequelize = require('sequelize');


router.get('/', (req,res) => 
models.Invoice.findAll()
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

    let data = [req.body];
    
    let { number, 
      date, 
      customername, 
      customeraddress,
      total } = req.body

    models.Invoice.create({
      number, 
      date, 
      customername, 
      customeraddress, 
      total
    })
    .then(function(invoice){
        console.log(invoice.id)
        var reqname = req.body.name
        console.log(typeof(req.body.name))
        if (typeof reqname === "object") {
          console.log("true")
          var passData = []
          for(let i = 0; i<data.length; i++){
            console.log(data[i].name)
              for(let j = 0; j<data[i].name.length; j++){
                  console.log(data[i].quantity[j])
                  passData.push({
                    InvoiceId : invoice.id, 
                    name : data[i].name[j], 
                    price: data[i].price[j], 
                    quantity : data[i].quantity[j] 
                  })
              }
          }
          console.log(passData)
          models.Item.bulkCreate(passData)
        } else {
          console.log('name is string')
          models.Item.create({
            InvoiceId : invoice.id,
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity
          })

        }
        res.redirect('/invoices')
    })
    .catch(err => console.log(err))
})

//show single invoice
router.get('/:id', (req, res) => { 

  models.Invoice.findOne({
    where: {id : req.params.id },
    include : [{
      model : models.Item
    }]
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

  models.Invoice.findOne({
    where: {id : req.params.id },
    include : [{
      model : models.Item
    }]
  })
  .then(invoice => {
    // console.log(invoice)
    res.render('edit', {invoice})
  })
  .catch(err => console.log(err))
})

//edit single invoice
router.post('/edit/:id', (req, res) => { 
      // update invoice
      let updateValues = { number: req.body.number, 
        date: req.body.date, 
        customername: req.body.customername, 
        customeraddress: req.body.customeraddress, 
        total: req.body.total
      }
      models.Invoice.update(updateValues, { where:{ id:req.params.id } } ).then((invoice) => {
        //update invoice items
        var data = [req.body]
        var reqname = req.body.name
        if (typeof reqname === "object") {
          var passData = []
          for(let i = 0; i<data.length; i++){
            for(let j = 0; j<data[i].name.length; j++){
              passData.push({ 
                InvoiceId :req.params.id,
                id:data[i].id[j],
                name: data[i].name[j], 
                price: data[i].price[j], 
                quantity: data[i].quantity[j] 
              })
            }
          }
          var updateData = [];
          passData.forEach((item) => {
              updateData.push(new Promise((resolve,reject) => {
                resolve(models.Item.update({name:item.name,price:item.price,quantity:item.quantity}, {where : {id:item.id}}))
              }))
            }
          );
          Promise.all(updateData).then(function(success){
              console.log(success)
              res.redirect('/invoices')
          });
        } else {
          models.Item.update({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity
          }, { where:{ id:req.body.id } })
          res.redirect('/invoices')
        }
      }).catch(e => console.log(e));
})

router.get('/delete/:id', (req, res) => { 

  models.Invoice.destroy({
    where: {id : req.params.id },
    include : [{
      model : models.Item
    }]
  })
  .then(invoice => {
    
    res.redirect('/invoices')
  })
  .catch(err => console.log(err))
})


module.exports = router;