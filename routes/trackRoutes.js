const express = require('express');
const { getTracks, getTrackById, addTrack, updateTrack, deleteTrack } = require('../controllers/trackController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getTracks);
router.get('/:id', authMiddleware, getTrackById);
router.post('/add-track', authMiddleware, addTrack);
router.put('/:id', authMiddleware, updateTrack);
router.delete('/:id', authMiddleware, deleteTrack);

module.exports = router;
