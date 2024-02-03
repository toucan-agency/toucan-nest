const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nazwa_bazy', 'użytkownik', 'hasło', {
  host: 'host_bazy_danych',
  dialect: 'mysql'
});

module.exports = sequelize;