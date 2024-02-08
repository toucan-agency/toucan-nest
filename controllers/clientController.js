const Client = require('../models/client');

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteClient = async (req, res) => {
  const clientId = req.params.id;
  const client = await Client.findByPk(clientId);

  if (!client) {
    return res.status(404).send({ message: 'Nie znaleziono klienta' });
  }

  await client.destroy();
  res.send({ message: 'Klient został usunięty' });
}

exports.getClientBySku = async (req, res) => {
  const sku = req.params.sku;
  const client = await Client.findOne({ where: { sku: sku } });

  if (!client) {
    return res.status(404).send({ message: 'Nie znaleziono klienta' });
  }

  res.json(client);
}