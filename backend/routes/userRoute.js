const express = require('express');
const { createUser, login, profile, logout, updateCurrentUser, updateUserAddress, getUserAddress, getAllUsers} = require('../controllers/userCtrl');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', createUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authenticate, profile);
router.put('/update-profile', authenticate, updateCurrentUser);
router.put('/update-address', authenticate, updateUserAddress);
router.get('/get-address', authenticate, getUserAddress);

module.exports = router;