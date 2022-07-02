const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.post('/getAccouts', mainController.getAccouts);
router.post('/getAccountBalance', mainController.getAccountBalance);
router.post('/getAllTransactions', mainController.getAllTransactions);
router.post('/getLastTransactions', mainController.getLastTransactions);
router.post('/getTransactionById', mainController.getTransactionById);
router.post('/newTransaction', mainController.newTransaction);
router.post('/editTransaction', mainController.editTransaction);
router.post('/deleteTransaction', mainController.deleteTransaction);

module.exports = router;