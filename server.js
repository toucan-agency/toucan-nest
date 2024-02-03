// Express.js server run & config
const express = require('express');
const path = require('path');
const app = express();

// Import database settings config
const sequelize = require('./config/database');

// Test SQL connection
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Import Sequelize models
const User = require('./models/user');
const Client = require('./models/client'); // Import new Client model
const Service = require('./models/service'); // Import new Service model
const ClientService = require('./models/clientservice'); // Import new ClientService model

// Sequelize models synchronization  
sequelize.sync().then(() => console.log("Tables have been created or updated."))
  .catch(err => console.error('Failed to synchronize database tables:', err));

// Middleware JSON parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path to React static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Simple API for testing
app.get('/api', (req, res) => res.send('Hello Toucan Nest Backend API!'));

// API Endpoints for handling CRUD operations might go here
// Example for creating a new client (implement the actual logic as needed)
app.post('/api/clients', async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).send(client);
  } catch (error) {
    console.error('Failed to create a client:', error);
    res.status(400).send({ error: 'Failed to create a client' });
  }
});

// SPA routing for handling React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Server run
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));