const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.post('/getUserAccounts', mainController.getUserAccounts);
router.post('/getAccountData', mainController.getAccountData);
router.post('/getAccountTransaction', mainController.getAccountTransaction);
router.post('/getAccountTransactions', mainController.getAccountTransactions);
router.post('/getUserLastTransactions', mainController.getUserLastTransactions);
router.post('/getTransactionById', mainController.getTransactionById);
router.post('/newTransaction', mainController.newTransaction);
router.post('/editTransaction', mainController.editTransaction);
router.post('/deleteTransaction', mainController.deleteTransaction);


module.exports = router;