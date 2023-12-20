const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');


router.get('/', adminControllers.getAllProducts);
router.get('/create', adminControllers.showCreateProduct);
router.post('/create', adminControllers.createProduct);
router.get('/edit/:id', adminControllers.showEdit);
router.get('/id/edit', adminControllers.edit);
router.post('/edit' , adminControllers.update)
router.get('/delete/:id', adminControllers.destroy);

module.exports = router;
