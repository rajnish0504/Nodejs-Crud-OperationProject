const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const app = express();

dotenv.config();
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/users', userRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synchronized');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.log('❌ Sync error:', err));
