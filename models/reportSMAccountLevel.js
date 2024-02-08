const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./client');

class ReportSMAccountLevel extends Model { }

ReportSMAccountLevel.init({
    reportAccountLevelID: {
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
    reportID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accountID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    impressions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    clicks: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    comments: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shares: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reactions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    postEngagements: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    spend: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    dateRangeStart: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dateRangeEnd: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ReportAccountLevel'
});

Client.hasMany(ReportSMAccountLevel, { foreignKey: 'clientId' });
ReportSMAccountLevel.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = ReportSMAccountLevel;    