const models = require('../models');
const puppeteer = require('puppeteer');
const sequelize = require('sequelize');


exports.showReceipts = (req,res) => {
    models.Receipt.findAll()
    .then( receipt => {
        res.render('receipts/receipt', {
          receipt
        })
    })
    .catch(err => {
        console.log( err);
    })
}
//display receipt form
exports.newReceipt = (req, res) => res.render('receipts/add')

//add an receipt
exports.addReceipt = (req, res) => {

    let data = [req.body];
    console.log(req.body)
    let { number,date,customer,customeraddress,membershipNumber,fileNo,principalMember,companyName,attendingDoctor,total,branch,paymentType } = req.body
    models.Receipt.create({number,date,customer,customeraddress,membershipNumber,fileNo,principalMember,companyName,attendingDoctor,total,branch,paymentType})
    .then((receipt) => {

        let reqname = req.body.name
        if (typeof reqname === "object") {
          let  passData = []
          for(let i = 0; i<data.length; i++){
                for(let j = 0; j<data[i].name.length; j++){
                    passData.push({
                    ReceiptId : receipt.id, 
                    name : data[i].name[j], 
                    price: data[i].price[j], 
                    quantity : data[i].quantity[j],
                    itemTotal: data[i].itemTotal[j] 
                })
            }
          }
          models.Item.bulkCreate(passData)
        } else {
          models.Item.create({
            ReceiptId : receipt.id,
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            itemTotal:req.body.itemTotal
          })

        }
        res.redirect('/receipts')
    })
    .catch(err => console.log(err))
}

//show single receipt
exports.readOne = (req, res) => { 
   models.Receipt.findOne({
        where: {id : req.params.id },
        include : [{
        model : models.Item
        }]
   })
   .then( receipt => {
        res.render('receipts/view', {
          receipt, layout: false
        })
    })
}

// print receipt
exports.printReceipt = (req,res) => {
    (async () => {
        try {
          const browser = await puppeteer.launch({
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
            ]
          })
          const page = await browser.newPage()
          const id = req.params.id
          await page.goto('https://dentalms.herokuapp.com/receipts/'+id, {waitUntil: 'networkidle0'}) //receipts/:id/
  
          const buffer = await page.pdf({format: 'A4'}) //configurations
          res.type('application/pdf')
          res.send(buffer)
          browser.close()
        } catch (error) {
          console.log(err)
        }

    })()
}

//edit single receipt
exports.editReceipt = (req, res) => { 

  models.Receipt.findOne({
    where: {id : req.params.id },
    include : [{
      model : models.Item
    }]
  })
  .then(receipt => {
    res.render('receipts/edit', {receipt})
  })
  .catch(err => console.log(err))
}

//edit single receipt
exports.updateReceipt = (req, res) => { 
      // update receipt
      let updateValues = { 
        number: req.body.number, 
        date: req.body.date, 
        customer: req.body.customer, 
        customeraddress: req.body.customeraddress,
        principalMember: req.body.principalMember,
        companyName: req.body.companyName,
        branch: req.body.branch,
        paymentType: req.body.paymentType,
        attendingDoctor : req.body.attendingDoctor,
        membershipNumber: req.body.membershipNumber,
        fileNo: req.body.fileNo
      }
      models.Receipt.update(updateValues, { where:{ id:req.params.id } } ).then((receipt) => {
        //update receipt items
        var data = [req.body]
        var reqname = req.body.name
        if (typeof reqname === "object") {
          var passData = []
          for(let i = 0; i<data.length; i++){
            for(let j = 0; j<data[i].name.length; j++){
              passData.push({ 
                ReceiptId :req.params.id,
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
              res.redirect('/receipts')
          });
        } else {
          models.Item.update({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity
          }, { where:{ id:req.body.id } })
          res.redirect('/receipts')
        }
      }).catch(e => console.log(e));
}

exports.deleteReceipt = (req, res) => { 

  models.Receipt.destroy({
    where: {id : req.params.id },
    include : [{
      model : models.Item
    }]
  })
  .then(receipt => {
    
    res.redirect('/receipts')
  })
  .catch(err => console.log(err))
}
