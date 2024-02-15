import React, { useState, useEffect } from 'react';
import ChooseAccount from '../ChooseAccount/ChooseAccount';

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
    const [activeService, setActiveService] = useState("");
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    useEffect(() => {
        document.title = 'Toucan Nest 1.0 | Zarządzanie klientami';
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

    const handleStatusChange = (clientID, serviceID, status, apiName) => {
        setClientServiceData(prevData => {
            const newData = [...prevData];
            let clientService = newData.find(cs => cs.clientID === clientID && cs.serviceID === serviceID);
            if (clientService) {
                clientService.status = status;
            } else {
                clientService = { clientID, serviceID, status, apiAccountID: null };
                newData.push(clientService);
            }
            if (status === 'active') {
                setActiveService({ apiName, clientService });
            } else {
                setActiveService(null);
                clientService.apiAccountID = null; // resetuj wybrane ID konta
            }
            return newData;
        });
    };

    const handleSave = async (clientID) => {
        const clientServices = clientServiceData.filter(cs => cs.clientID === clientID);
        for (let clientService of clientServices) {
            if (clientService.clientServiceID) {
                console.log(clientService);
                await fetch(`/api/clientservices/update/${clientService.clientServiceID}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientService),
                });
            } else {
                console.log(clientService);
                await fetch('/api/clientservices/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientService),
                });
            }
        }
        fetchClientServiceData();
    };

    const refreshClientServicesData = async (clientID, accountID, since, until, pageId) => {
        // Wywołaj pierwsze zapytanie do API
        await fetch('/api/meta_api/reportSMAdsAccountLevel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accountID: accountID,
                clientId: clientID,
                since: since,
                until: until
            }),
        });

        // Wywołaj drugie zapytanie do API
        await fetch('/api/meta_api/reportSMAdsPostLevel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clientId: clientID,
                pageId: pageId,
                since: since,
                until: until
            }),
        });

        console.log('Odświeżono dane klienta');
    };

    const getApiAccountId = (clientID, serviceID) => {
        const clientService = clientServiceData.find(cs => cs.clientID === clientID && cs.serviceID === serviceID);
        return clientService ? clientService.apiAccountID : null;
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Zarządzanie klientami</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={clientData.SKU}
                    onChange={(e) => setClientData({ ...clientData, SKU: e.target.value })}
                    placeholder="SKU"
                    required
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    value={clientData.companyName}
                    onChange={(e) => setClientData({ ...clientData, companyName: e.target.value })}
                    placeholder="Nazwa firmy"
                    required
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="email"
                    value={clientData.contactEmail}
                    onChange={(e) => setClientData({ ...clientData, contactEmail: e.target.value })}
                    placeholder="Email"
                    required
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    value={clientData.phoneNumber}
                    onChange={(e) => setClientData({ ...clientData, phoneNumber: e.target.value })}
                    placeholder="Numer telefonu"
                    className="border p-2 mb-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Dodaj klienta</button>
            </form>

            {activeService && <ChooseAccount accountType={activeService.apiName} onAccountSelect={(accountId) => {
                activeService.clientService.apiAccountID = accountId;
                setActiveService(null);
            }} />}

            <table className="table-auto w-full mb-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">SKU</th>
                        <th className="border px-4 py-2">Nazwa firmy</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Numer telefonu</th>
                        {services.map((service) => (
                            <th key={service.serviceID} className="border px-4 py-2">{service.name}</th>
                        ))}
                        <th className="border px-4 py-2">Zapisz Usługi</th>
                        <th className="border px-4 py-2">Usuń</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td className="border px-4 py-2">{client.SKU}</td>
                            <td className="border px-4 py-2"><a href={`/raport-sm/${client.SKU}`}>{client.companyName}</a></td>
                            <td className="border px-4 py-2">{client.contactEmail}</td>
                            <td className="border px-4 py-2">{client.phoneNumber}</td>
                            {services.map((service) => {
                                const clientService = findClientService(client.id, service.serviceID);
                                return (
                                    <td key={service.serviceID} className="border px-4 py-2">
                                        <select value={clientService.status} onChange={e => handleStatusChange(client.id, service.serviceID, e.target.value, service.apiName)} className="border p-2 mb-2 w-full">
                                            <option value="active">Aktywny</option>
                                            <option value="inactive">Nieaktywny</option>
                                            <option value="suspended">Zawieszony</option>
                                        </select>
                                        <p>{clientService.apiAccountID}</p>
                                    </td>
                                );
                            })}
                            <td className="border px-4 py-2"><button onClick={() => handleSave(client.id)} className="bg-blue-500 text-white px-4 py-2 rounded">Zapisz</button></td>
                            <td className="border px-4 py-2"><button onClick={() => handleDelete(client.id)} className="bg-red-500 text-white px-4 py-2 rounded">Usuń</button></td>
                            <td className="border px-4 py-2"><button onClick={() => refreshClientServicesData(client.id, getApiAccountId(client.id, 10), '2024-01-01', '2024-01-31', getApiAccountId(client.id, 7))} className="bg-green-500 text-white px-4 py-2 rounded">Odśwież</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientManage;