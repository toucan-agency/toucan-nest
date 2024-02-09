const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class FiledNames extends Model { }

FiledNames.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isShow: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    prettyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postFix: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'FiledNames'
});

module.exports = FiledNames;