const express = require('express');
const router = express.Router();
const auth = require('../config/auth')
const invoiceService = require('../services/invoiceService')


router.get('/', auth.ensureAunthenticated, invoiceService.showInvoices)
//display invoice form
router.get('/add', auth.ensureAunthenticated, invoiceService.newInvoice)
//add an invoice
router.post('/add', auth.ensureAunthenticated, invoiceService.addInvoice)
//show single invoice
router.get('/:id',  invoiceService.readOne)
router.get('/:id/pdf', invoiceService.printInvoice)
//edit single invoice
router.get('/edit/:id', auth.ensureAunthenticated, invoiceService.editInvoice)
//edit single invoice
router.post('/edit/:id', auth.ensureAunthenticated, invoiceService.updateInvoice)
router.get('/delete/:id', auth.ensureAunthenticated, invoiceService.deleteInvoice)


module.exports = router;