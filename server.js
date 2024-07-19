const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { authenticateJWT } = require('./middleware/authenticate');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { initializeDatabase } = require('./config/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/notes', authenticateJWT, noteRoutes);

initializeDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
