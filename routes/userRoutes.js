const express = require('express');
const router = express.Router();
const { getUsers, addUser, deleteUser, updatePassword } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Use 'middleware'
const roleMiddleware = require('../middleware/roleMiddleware');


// Admin can get all users
router.get('/', authMiddleware, roleMiddleware(['Admin']), getUsers);

// Admin can add a new user
router.post('/add-user', authMiddleware, roleMiddleware(['Admin']), addUser);

// Admin can delete a user
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteUser);

// User can update their own password
router.put('/update-password', authMiddleware, updatePassword);

module.exports = router;
