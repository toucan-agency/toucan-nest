const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./client');

class ReportSMAdsPostLevel extends Model { }

ReportSMAdsPostLevel.init({
    reportAccountLevelId: {
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
    pageId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    postImageUrl: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    permalinkUrl: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    impressions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reach: {
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
    createdTime: {
        type: DataTypes.DATE,
        allowNull: false
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
    modelName: 'ReportSMAdsPostLevel'
});

Client.hasMany(ReportSMAdsPostLevel, { foreignKey: 'clientId' });
ReportSMAdsPostLevel.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = ReportSMAdsPostLevel;    