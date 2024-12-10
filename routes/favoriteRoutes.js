const express = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:category', authMiddleware, getFavorites);
router.post('/add-favorite', authMiddleware, addFavorite);
router.delete('/remove-favorite/:id', authMiddleware, removeFavorite);

module.exports = router;