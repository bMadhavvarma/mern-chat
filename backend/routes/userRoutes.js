const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// Routes
router.post('/register', registerUser);
// router.post('/login', authUser);

module.exports = router;
