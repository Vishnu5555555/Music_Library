const Favorite = require('../models/Favorite');
const User = require('../models/User');

const addFavorite = async (req, res) => {
  const { entityId, category } = req.body;
  const user = req.user;

  try {
    const favorite = new Favorite({ user: user._id, entityId, category });
    await favorite.save();
    return res.status(201).json({ message: 'Favorite added' });
  } catch (error) {
    return res.status(400).json({ message: 'Error adding favorite', error });
  }
};

const removeFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    await Favorite.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Favorite removed' });
  } catch (error) {
    return res.status(400).json({ message: 'Error removing favorite', error });
  }
};

const getFavorites = async (req, res) => {
  const { category } = req.params;
  const user = req.user;

  try {
    const favorites = await Favorite.find({ user: user._id, category });
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching favorites', error });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
