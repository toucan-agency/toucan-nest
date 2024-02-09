const FiledNames = require('../models/filedNames');

exports.getFieldNames = async (req, res) => {
  try {
    const fieldNames = await FiledNames.findAll();
    res.json(fieldNames);
  } catch (error) {
    res.status(500).send(error.message);
  }
};