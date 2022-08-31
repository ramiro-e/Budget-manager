const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const authMiddleware = require('../middlewares/auth')

router.post('/getUserAccounts', authMiddleware, mainController.getUserAccounts);
router.post('/getCategories', authMiddleware, mainController.getCategories);
router.post('/getMethods', authMiddleware, mainController.getMethods);
router.post('/getAccountData', authMiddleware, mainController.getAccountData);
router.post('/getUserAccountsData', authMiddleware, mainController.getUserAccountsData);
router.post('/getAccountAllTransactions', authMiddleware, mainController.getAccountAllTransactions);
router.post('/getUserLastTransactions', authMiddleware, mainController.getUserLastTransactions);
router.post('/getTransactionById', authMiddleware, mainController.getTransactionById);
router.post('/newAccount', authMiddleware, mainController.newAccount);
router.post('/newTransaction', authMiddleware, mainController.newTransaction);
router.post('/editTransaction', authMiddleware, mainController.editTransaction);
router.post('/deleteTransaction', authMiddleware, mainController.deleteTransaction);



module.exports = router;