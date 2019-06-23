const express = require('express');
const router = express.Router();
const auth = require('../config/auth')
const receiptService = require('../services/receiptService')


router.get('/', auth.ensureAunthenticated, receiptService.showReceipts)
//display receipt form
router.get('/add', auth.ensureAunthenticated, receiptService.newReceipt)
//add an receipt
router.post('/add', auth.ensureAunthenticated, receiptService.addReceipt)
//show single receipt
router.get('/:id',  receiptService.readOne)
router.get('/:id/pdf', receiptService.printReceipt)
//edit single receipt
router.get('/edit/:id', auth.ensureAunthenticated, receiptService.editReceipt)
//edit single receipt
router.post('/edit/:id', auth.ensureAunthenticated, receiptService.updateReceipt)
router.get('/delete/:id', auth.ensureAunthenticated, receiptService.deleteReceipt)


module.exports = router;