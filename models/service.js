const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Service extends Model {}

Service.init({
  serviceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Service'
});

module.exports = Service;
