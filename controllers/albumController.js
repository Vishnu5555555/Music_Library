const Album = require('../models/Album');
const Artist = require('../models/Artist');

// Get all albums (Viewer, Editor, Admin)
const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find({ hidden: false }).populate('artist');
    res.status(200).json(albums);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching albums', error });
  }
};

// Get a specific album (Viewer, Editor, Admin)
const getAlbumById = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id).populate('artist');
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.status(200).json(album);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching album', error });
  }
};

// Add an album (Admin only)
const addAlbum = async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }

  const { name, year, hidden, artistId } = req.body;
  try {
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    const album = new Album({ name, year, hidden, artist: artist._id });
    await album.save();
    res.status(201).json({ message: 'Album added successfully', album });
  } catch (error) {
    res.status(400).json({ message: 'Error adding album', error });
  }
};

// Update an album (Admin or Editor)
const updateAlbum = async (req, res) => {
  const { id } = req.params;
  if (req.user.role === 'Viewer') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }

  try {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    const { name, year, hidden } = req.body;
    album.name = name || album.name;
    album.year = year || album.year;
    album.hidden = hidden || album.hidden;

    await album.save();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error updating album', error });
  }
};

// Delete an album (Admin only)
const deleteAlbum = async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Unauthorized action' });
  }

  const { id } = req.params;
  try {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    await album.remove();
    res.status(200).json({ message: 'Album deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting album', error });
  }
};

module.exports = { getAlbums, getAlbumById, addAlbum, updateAlbum, deleteAlbum };
