const Track = require('../models/Track');
const Album = require('../models/Album');
const Artist = require('../models/Artist');

// Get all tracks (Viewer, Editor, Admin)
const getTracks = async (req, res) => {
  try {
    const tracks = await Track.find({ hidden: false }).populate('album').populate('artist');
    res.status(200).json(tracks);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tracks', error });
  }
};

// Get a specific track (Viewer, Editor, Admin)
const getTrackById = async (req, res) => {
  const { id } = req.params;
  try {
    const track = await Track.findById(id).populate('album').populate('artist');
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    res.status(200).json(track);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching track', error });
  }
};

// Add a track (Admin only)
const addTrack = async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }

  const { name, duration, hidden, albumId, artistId } = req.body;
  try {
    const album = await Album.findById(albumId);
    const artist = await Artist.findById(artistId);

    if (!album || !artist) {
      return res.status(404).json({ message: 'Album or Artist not found' });
    }

    const track = new Track({ name, duration, hidden, album: album._id, artist: artist._id });
    await track.save();
    res.status(201).json({ message: 'Track added successfully', track });
  } catch (error) {
    res.status(400).json({ message: 'Error adding track', error });
  }
};

// Update a track (Admin or Editor)
const updateTrack = async (req, res) => {
  const { id } = req.params;
  if (req.user.role === 'Viewer') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }

  try {
    const track = await Track.findById(id);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    const { name, duration, hidden } = req.body;
    track.name = name || track.name;
    track.duration = duration || track.duration;
    track.hidden = hidden || track.hidden;

    await track.save();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error updating track', error });
  }
};

// Delete a track (Admin only)
const deleteTrack = async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }

  const { id } = req.params;
  try {
    const track = await Track.findById(id);
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }
    await track.remove();
    res.status(200).json({ message: 'Track deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting track', error });
  }
};

module.exports = { getTracks, getTrackById, addTrack, updateTrack, deleteTrack };
