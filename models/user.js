const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

class User extends Model { }

User.init({
  // Attributes definition
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validates email format
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM,
    values: ['admin', 'worker', 'client'],
    allowNull: false
  }
}, {
  // Model options
  sequelize, // Connection instance
  modelName: 'User', // Model name
  tableName: 'users', // Table name
  timestamps: true, // Sequelize will automatically add createdAt and updatedAt columns
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  hooks: {
    // Hook beforeSave
    async beforeSave(user) {
      // If password has been modified (or is new), then hash it
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10); // GenSalt
        user.password = await bcrypt.hash(user.password, salt); // Hash pass
      }
    }
  }
});

module.exports = User;