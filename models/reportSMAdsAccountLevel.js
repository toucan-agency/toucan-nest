const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./client');

class ReportSMAdsAccountLevel extends Model { }

ReportSMAdsAccountLevel.init({
    reportAccountLevelID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clientId: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id'
        }
    },
    accountID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reach: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    impressions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    clicks: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    linkClicks: {
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
    ctr: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    spend: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    frequency: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    video_p25_watched_actions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    video_p50_watched_actions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    video_p75_watched_actions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    video_p100_watched_actions: {
        type: DataTypes.INTEGER,
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
    modelName: 'ReportSMAdsAccountLevel'
});

Client.hasMany(ReportSMAdsAccountLevel, { foreignKey: 'clientId' });
ReportSMAdsAccountLevel.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = ReportSMAdsAccountLevel;    