const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./client');
const Service = require('./service');

class ClientService extends Model {}

ClientService.init({
  clientServiceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clientID: {
    type: DataTypes.INTEGER,
    references: {
      model: Client,
      key: 'id'
    }
  },
  serviceID: {
    type: DataTypes.INTEGER,
    references: {
      model: Service,
      key: 'serviceID'
    }
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active', // Możliwe wartości: 'active', 'inactive', 'suspended', etc.
  },
  otherDetails: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ClientService'
});

module.exports = ClientService;