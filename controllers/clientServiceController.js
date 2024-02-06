const ClientService = require('../models/clientservice');

exports.getClientServices = async (req, res) => {
  try {
    const clientServices = await ClientService.findAll({
      include: [{ all: true }]
    });
    res.json(clientServices);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createClientService = async (req, res) => {
  try {
    const clientService = await ClientService.create(req.body);
    res.status(201).json(clientService);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
