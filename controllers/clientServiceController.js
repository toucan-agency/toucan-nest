const ClientService = require('../models/clientservice');

exports.getClientServiceByClientIdAndServiceId = async (req, res, next) => {
    try {
        const clientService = await ClientService.findOne({ where: { clientID: req.params.clientID, serviceID: req.params.serviceID } });
        res.status(200).json(clientService);
    } catch (err) {
        next(err);
    }
}

exports.getAllClientServices = async (req, res, next) => {
    try {
        const clientServices = await ClientService.findAll();
        res.status(200).json(clientServices);
    } catch (err) {
        next(err);
    }
}

exports.createClientService = async (req, res, next) => {
    try {
        const clientService = await ClientService.create(req.body);
        console.log(clientService);
        res.status(201).json(clientService);
    } catch (err) {
        console.error('Error occurred while creating client service:', err);
        err.status = 500;
        err.message = 'Internal server error occurred while trying to create client service';
        next(err);
    }
}

exports.updateClientService = async (req, res, next) => {
    try {
        await ClientService.update(req.body, { where: { clientServiceID: req.params.clientServiceID } });
        res.status(200).json({ message: 'Client service updated successfully' });
    } catch (err) {
        next(err);
    }
}

exports.deleteClientService = async (req, res, next) => { 
    try {
        await ClientService.destroy({ where: { clientID: req.params.clientID } });
        res.status(200).json({ message: 'Client service deleted successfully' });
    } catch (err) {
        next(err);
    }
}