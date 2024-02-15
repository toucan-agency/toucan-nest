// Express.js server run & config 
const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const API_URL = process.env.REACT_APP_API_URL;

// Middleware JSON parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
const cors = require('cors');
app.use(cors());

// Import database settings config
const sequelize = require('./config/database');

// Import routers test
const clientRoutes = require('./routes/clientRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const clientServiceRoutes = require('./routes/clientServiceRoutes');
const metaAPIRoutes = require('./routes/metaAPIRoutes');
const fieldNamesRoutes = require('./routes/fieldNamesRoutes');
const monthlySummaryRoutes = require('./routes/monthlySummaryRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/clients', clientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/clientservices', clientServiceRoutes);
app.use('/api/meta_api', metaAPIRoutes);
app.use('/api/fieldnames', fieldNamesRoutes);
app.use('/api/monthly_summaries', monthlySummaryRoutes);
app.use('/api', authRoutes);


// Test SQL connection
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Import Sequelize models
const User = require('./models/user');
const Client = require('./models/client');
const Service = require('./models/service');
const ClientService = require('./models/clientservice');
const ReportSMAdsAccountLevel = require('./models/reportSMAdsAccountLevel');
const ReportSMAdsPostLevel = require('./models/reportSMAdsPostLevel');
const FiledNames = require('./models/filedNames');

// Sequelize models synchronization  
sequelize.sync(
      // { alter: true } // Użyj tego parametru, aby nie tracić danych
)
  .then(() => console.log("Tables have been created or updated."))
  .catch(err => console.error('Failed to synchronize database tables:', err));

// Path to React static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Simple API for testing
app.get('/api', (req, res) => res.send('Hello Toucan Nest Backend API! a wybrana baza danych to: ' + process.env.DB_NAME)); 

// SPA routing for handling React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Server run
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));