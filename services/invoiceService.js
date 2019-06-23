const models = require('../models');
const puppeteer = require('puppeteer');
const sequelize = require('sequelize');


exports.showInvoices = (req,res) => {
    models.Invoice.findAll()
    .then( invoice => {
        res.render('invoices/invoice', {
            invoice
        })
    })
    .catch(err => {
        console.log( err);
    })
}
//display invoice form
exports.newInvoice = (req, res) => res.render('invoices/add')

//add an invoice
exports.addInvoice = (req, res) => {

    let data = [req.body];
    let { number,date,customername,customeraddress,total,branch } = req.body
    models.Invoice.create({number,date,customername,customeraddress,total,branch})
    .then((invoice) => {

        let reqname = req.body.name
        if (typeof reqname === "object") {
          let  passData = []
          for(let i = 0; i<data.length; i++){
                for(let j = 0; j<data[i].name.length; j++){
                    passData.push({
                    InvoiceId : invoice.id, 
                    name : data[i].name[j], 
                    price: data[i].price[j], 
                    quantity : data[i].quantity[j] 
                })
            }
          }
          models.Item.bulkCreate(passData)
        } else {
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
}

//show single invoice
exports.readOne = (req, res) => { 
   models.Invoice.findOne({
        where: {id : req.params.id },
        include : [{
        model : models.Item
        }]
   })
   .then( invoice => {
        res.render('invoices/view', {
            invoice, layout: false
        })
    })
}

// print invoice
exports.printInvoice = (req,res) => {
        const browser =  puppeteer.launch()
        const page =  browser.newPage()
        const id = req.params.id
         page.goto('http://localhost:8000/invoices/'+id, {waitUntil: 'networkidle0'}) //invoices/:id/
        const buffer =  page.pdf({format: 'A4'}) //configurations
        res.type('application/pdf')
        res.send(buffer)
        browser.close()
}

//edit single invoice
exports.editInvoice = (req, res) => { 

  models.Invoice.findOne({
    where: {id : req.params.id },
    include : [{
      model : models.Item
    }]
  })
  .then(invoice => {
    res.render('invoices/edit', {invoice})
  })
  .catch(err => console.log(err))
}

//edit single invoice
exports.updateInvoice = (req, res) => { 
      // update invoice
      let updateValues = { number: req.body.number, 
        date: req.body.date, 
        customername: req.body.customername, 
        customeraddress: req.body.customeraddress, 
        total: req.body.total,
        branch : req.body.branch
      }
      models.Invoice.update(updateValues, { where:{ id:req.params.id } } )
       .then((invoice) => {
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
          Promise.all(updateData).then((success) => {
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
}

exports.deleteInvoice = (req, res) => { 

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
}
