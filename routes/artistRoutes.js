const express = require('express');
const { getArtists, getArtistById, addArtist, updateArtist, deleteArtist } = require('../controllers/artistController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getArtists);
router.get('/:id', authMiddleware, getArtistById);
router.post('/add-artist', authMiddleware, addArtist);
router.put('/:id', authMiddleware, updateArtist);
router.delete('/:id', authMiddleware, deleteArtist);

module.exports = router;
