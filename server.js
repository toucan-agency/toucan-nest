const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aktualizacja ścieżki do statycznych plików React
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api', (req, res) => res.send('Hello Toucan Nest Backend API!'));

// Aktualizacja ścieżki do index.html React dla obsługi SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));