const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { signup, login } = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const userController = require('./controllers/userController');  
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON bodies


// POST route for signup
app.post('/api/v1/signup', signup);

// POST route for login
app.post('/api/v1/login', login);

app.post('/api/v1/users', authMiddleware, roleMiddleware(['Admin']), userController.addUser);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/music_library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected...');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/tracks', trackRoutes);
app.use('/api/v1/favorites', favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
