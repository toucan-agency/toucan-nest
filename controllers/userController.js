const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  const { email, password } = req.body;
  const userId = req.userId; // Pobierz ID użytkownika z autoryzacji

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.send({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error updating user' });
  }
};