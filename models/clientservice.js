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
  apiAccountID: {
    type: DataTypes.STRING,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
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

Client.hasMany(ClientService, { foreignKey: 'clientID' });
Service.hasMany(ClientService, { foreignKey: 'serviceID' });
ClientService.belongsTo(Client, { foreignKey: 'clientID' });
ClientService.belongsTo(Service, { foreignKey: 'serviceID' });

module.exports = ClientService;