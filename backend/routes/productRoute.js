const express = require('express');
const { uploadImageByLink, uploadImages, createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, getProductByTitle, updateReviews } = require('../controllers/productCtrl');
const photosMiddleware = require('../middlewares/photosMiddleware');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', createProduct);
router.post('/upload-by-link', uploadImageByLink);
router.post('/upload', photosMiddleware.array("images", 100), uploadImages);

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.get('/single/:title', getProductByTitle);

router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

router.put('/', authenticate, authorizeAdmin, updateProduct);
router.put('/:id', authenticate, updateReviews);


module.exports = router;