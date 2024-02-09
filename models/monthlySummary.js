// models/monthlySummary.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./client');

class MonthlySummary extends Model {}

MonthlySummary.init({
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'id'
    }
  },
  month: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  reportLink: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'MonthlySummary'
});

Client.hasMany(MonthlySummary, { foreignKey: 'clientId' });
MonthlySummary.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = MonthlySummary;