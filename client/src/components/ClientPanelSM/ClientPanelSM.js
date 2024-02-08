import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

function ClientPanelSM() {
    const { sku } = useParams();
    const [clientData, setClientData] = useState(null);
    const [services, setServices] = useState([]);
    const [clientServiceData, setClientServiceData] = useState([]);

    const fetchClientData = async (sku) => {
        try {
            const response = await fetch(`/api/clients/sku/${sku}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            console.log('Response text:', text);
            const data = JSON.parse(text);
            setClientData(data);
        } catch (error) {
            console.error('A problem occurred while fetching the client data:', error);
        }
    }

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


    const findClientService = (clientID, serviceID) => {
        return clientServiceData.find(cs => cs.clientID === clientID && cs.serviceID === serviceID) || { status: 'inactive' };
    };

    const lastMonthDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
    ).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });

    useEffect(() => {
        if (!sku) {
            return;
        }
        fetchClientData(sku);
        fetchServices();
        fetchClientServiceData();
    }, [sku]);

    // Jeśli SKU nie jest zdefiniowane, przekieruj użytkownika
    if (!sku) {
        return <Navigate to="/" />;
    }

if (!clientData || !services.length || !clientServiceData.length) {
  return <div>Loading...</div>;
}

    return (
        <>
            <h1>{clientData.companyName}</h1>
            <p>SKU: {clientData.SKU}</p>
            <p>{lastMonthDate}</p>
            <hr />
            {services.map((service) => {
                const clientService = findClientService(clientData.id, service.serviceID);
                return (
                    <>
                        <p>{service.name}</p>
                        <p>{clientService.status}</p>
                    </>
                );
            })}
            <hr />

        </>
    );


}

export default ClientPanelSM;