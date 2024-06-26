require('dotenv').config();
const util = require('util');

const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  // Połączenie za pomocą gniazda Unix w środowisku produkcyjnym
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    // host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      socketPath: util.format('/cloudsql/%s', process.env.DB_SOCKET_PATH),
      charset: 'utf8mb4',
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false,
      charset: 'utf8mb4',
    },
  });
} else {
  // Połączenie za pomocą standardowego połączenia TCP w środowisku lokalnym asd
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  });
}

module.exports = sequelize;