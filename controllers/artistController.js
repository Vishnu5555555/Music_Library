const Artist = require('../models/Artist');
const User = require('../models/User');

// Get all artists (Viewer, Editor, Admin)
const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ hidden: false });
    res.status(200).json(artists);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching artists', error });
  }
};

// Get a specific artist (Viewer, Editor, Admin)
const getArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching artist', error });
  }
};

// Add an artist (Admin only)
const addArtist = async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }
  const { name, grammy, hidden } = req.body;
  try {
    const artist = new Artist({ name, grammy, hidden });
    await artist.save();
    res.status(201).json({ message: 'Artist added successfully', artist });
  } catch (error) {
    res.status(400).json({ message: 'Error adding artist', error });
  }
};

// Update an artist (Admin or Editor with specific permissions)
const updateArtist = async (req, res) => {
  const { id } = req.params;
  if (req.user.role === 'Viewer') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }

  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    if (req.user.role === 'Editor' && artist.hidden) {
      return res.status(403).json({ message: 'Editor cannot update hidden artist' });
    }

    const { name, grammy, hidden } = req.body;
    artist.name = name || artist.name;
    artist.grammy = grammy || artist.grammy;
    artist.hidden = hidden || artist.hidden;

    await artist.save();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error updating artist', error });
  }
};

// Delete an artist (Admin only)
const deleteArtist = async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }

  const { id } = req.params;
  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    await artist.remove();
    res.status(200).json({ message: 'Artist deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting artist', error });
  }
};

module.exports = { getArtists, getArtistById, addArtist, updateArtist, deleteArtist };
