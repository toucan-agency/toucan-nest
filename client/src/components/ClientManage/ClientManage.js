import React, { useState, useEffect } from 'react';

function ClientManage() {
    const [clients, setClients] = useState([]);
    const [clientData, setClientData] = useState({
        SKU: "",
        companyName: "",
        contactEmail: "",
        phoneNumber: ""
    });
    const [services, setServices] = useState([]);
    const [clientServiceData, setClientServiceData] = useState({});

    useEffect(() => {
        fetchClients();
        fetchServices();
        fetchClientServiceData();
    }, []);

    const fetchClients = async () => {
        const response = await fetch('/api/clients');
        const data = await response.json();
        setClients(data);
    };

    const fetchServices = async () => {
        const response = await fetch('/api/services');
        const data = await response.json();
        setServices(data);
    };
    
    const fetchClientServiceData = async () => {
        const response = await fetch('/api/clientservices');
        const data = await response.json();
        setClientServiceData(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData),
        });
        setClientData({
            SKU: "",
            companyName: "",
            contactEmail: "",
            phoneNumber: ""
        });
        fetchClients();
    };

    const handleDelete = async (clientID) => {
        await fetch(`/api/clients/${clientID}`, {
            method: 'DELETE',
        });
        await fetch(`/api/clientservices/delete/${clientID}`, {
            method: 'DELETE',
        });
        fetchClients();
    }

    const findClientService = (clientID, serviceID) => {
        return clientServiceData.find(cs => cs.clientID === clientID && cs.serviceID === serviceID) || { status: 'inactive' };
    };

    const handleStatusChange = (clientID, serviceID, status) => {
        setClientServiceData(prevData => {
            const newData = [...prevData];
            const clientService = newData.find(cs => cs.clientID === clientID && cs.serviceID === serviceID);
            if (clientService) {
                clientService.status = status;
            } else {
                newData.push({ clientID, serviceID, status });
            }
            return newData;
        });
    };

    const handleSave = async (clientID) => {
        const clientServices = clientServiceData.filter(cs => cs.clientID === clientID);
        console.log(clientServices);
        for (let clientService of clientServices) {
            if (clientService.clientServiceID) {
                await fetch(`/api/clientservices/update/${clientService.clientServiceID}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientService),
                });
            } else {
                await fetch('/api/clientservices/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientService),
                });
            }
        }
        fetchClientServiceData();
    };

    return (
        <div>
            <h2>Zarządzanie klientami</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={clientData.SKU}
                    onChange={(e) => setClientData({ ...clientData, SKU: e.target.value })}
                    placeholder="SKU"
                    required
                />
                <input
                    type="text"
                    value={clientData.companyName}
                    onChange={(e) => setClientData({ ...clientData, companyName: e.target.value })}
                    placeholder="Nazwa firmy"
                    required
                />
                <input
                    type="email"
                    value={clientData.contactEmail}
                    onChange={(e) => setClientData({ ...clientData, contactEmail: e.target.value })}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    value={clientData.phoneNumber}
                    onChange={(e) => setClientData({ ...clientData, phoneNumber: e.target.value })}
                    placeholder="Numer telefonu"
                />
                <button type="submit">Dodaj klienta</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Nazwa firmy</th>
                        <th>Email</th>
                        <th>Numer telefonu</th>
                        {services.map((service) => (
                            <th key={service.serviceID}>{service.name}</th>
                        ))}
                        <th>Zapisz Usługi</th>
                        <th>Usuń</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.SKU}</td>
                            <td>{client.companyName}</td>
                            <td>{client.contactEmail}</td>
                            <td>{client.phoneNumber}</td>
                            {services.map((service) => {
                            const clientService = findClientService(client.id, service.serviceID);
                            return (
                                <td key={service.serviceID}>
                                    <select value={clientService.status} onChange={e => handleStatusChange(client.id, service.serviceID, e.target.value)}>
                                        <option value="active">Aktywny</option>
                                        <option value="inactive">Nieaktywny</option>
                                        <option value="suspended">Zawieszony</option>
                                    </select>
                                </td>
                            );
                        })}
                            <td><button onClick={() => handleSave(client.id)}>Zapisz</button></td>
                            <td><button onClick={() => handleDelete(client.id)}>Usuń</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientManage;