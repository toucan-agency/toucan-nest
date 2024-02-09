// controllers/monthlySummaryController.js

const MonthlySummary = require('../models/monthlySummary');

exports.getMonthlySummaries = async (req, res) => {
  try {
    const summaries = await MonthlySummary.findAll();
    res.json(summaries);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createMonthlySummary = async (req, res) => {
  console.log(req.body); // dodaj to
  try {
    const summary = await MonthlySummary.create(req.body);
    res.status(201).json(summary);
  } catch (error) {
    res.status(400).send(error.message);
  }
};