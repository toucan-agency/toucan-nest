const Service = require('../models/service');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteService = async (req, res) => {
  const serviceId = req.params.id; // ID usługi z parametrów żądania
  const service = await Service.findByPk(serviceId);

  if (!service) {
    return res.status(404).send({ message: 'Nie znaleziono usługi' });
  }

  await service.destroy();
  res.send({ message: 'Usługa została usunięta' });
};