const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Invoice = require('../models/Invoice');


router.get('/', (req,res) => 
Invoice.findAll()
.then( invoice => {
    console.log(invoice);
    res.sendStatus(200);
  })
  .catch(err => {
    console.log( err);
  })
)

module.exports = router;