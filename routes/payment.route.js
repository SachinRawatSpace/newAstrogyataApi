const express = require('express');
const { newPayment, checkStatus } = require('../controller/payment.controller');
const router = express();

router.post('/payment', newPayment);
router.post('/status/:txnId', checkStatus);

module.exports = router;