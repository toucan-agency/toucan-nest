import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

function ClientPanelSM() {
    const { sku } = useParams();
    const [clientData, setClientData] = useState(null);
    const [services, setServices] = useState([]);
    const [clientServiceData, setClientServiceData] = useState([]);
    const [clientService, setClientService] = useState({});
    const [raportSMAdsAccountLevel, setRaportSMAdsAccountLevel] = useState(null)
    const [fieldNames, setFieldNames] = useState([]);
    const [facebookPosts, setFacebookPosts] = useState(null);


    const fetchClientData = async (sku) => {
        try {
            const response = await fetch(`/api/clients/sku/${sku}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
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

    const fetchFieldNames = async () => {
        const response = await fetch('/api/fieldnames');
        const data = await response.json();
        setFieldNames(data);
    };

    const findRaportSMAdsAccountLevel = async (clientId, since) => {
        try {
            const response = await fetch(`/api/meta_api/getReportSMAdsAccountLevelFromDB/${clientId}/${since}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setRaportSMAdsAccountLevel(data);
        } catch (error) {
            console.error('A problem occurred while fetching the client data:', error);
        }
    }

    const fetchFacebookPosts = async (clientId) => {
        // Znajdź usługę o id 7 dla tego klienta
        const service = clientServiceData.find(cs => cs.clientID === clientId && cs.serviceID === 7);
        console.log("clientServiceData");
        console.log(service);

        // Jeśli usługa nie istnieje lub nie jest aktywna, nie rób nic
        if (!service || service.status !== 'active') {
            console.log('Service not found or not active');
            return;
        }

        // Pobierz apiAccountId z usługi
        const apiAccountId = service.apiAccountID;
        console.log(apiAccountId);

        // Wykonaj żądanie API
        const response = await fetch(`/api/meta_api/facebook_posts/${clientId}/${apiAccountId}/${sinceDate}`);
        const data = await response.json();
        setFacebookPosts(data);
    };

    const lastMonthDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
    ).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });

    const sinceDate = new Date(Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth() - 1,
        1
    )).toISOString().split('T')[0];

    const raportSMPostLevel = clientServiceData.find(cs => cs.clientID === clientData.id && cs.serviceID === 7);

    useEffect(() => {
        if (clientData) {
            document.title = `Toucan Nest | ${clientData.companyName} | Panel klienta`;
        }
    }, [clientData]);

    useEffect(() => {
        if (!sku) {
            return;
        }
        fetchClientData(sku);
        fetchServices();
        fetchClientServiceData();
        fetchFieldNames();
    }, [sku]);

    useEffect(() => {
        if (!services.length || !clientServiceData.length || !clientData) {
            return;
        }
        const activeServices = {};
        services.forEach(service => {
            const clientService = clientServiceData.find(cs => cs.clientID === clientData.id && cs.serviceID === service.serviceID);
            activeServices[service.name] = clientService ? clientService.status : 'inactive';
        });
        setClientService(activeServices);
    }, [services, clientServiceData, clientData]);

    useEffect(() => {
        if (!clientData) {
            return;
        }
        findRaportSMAdsAccountLevel(clientData.id, sinceDate);
        //fetchFacebookPosts(clientData.id);

    }, [clientData]);

    useEffect(() => {
        if (!clientData || !clientServiceData.length) {
            return;
        }
        const service = clientServiceData.find(cs => cs.clientID === clientData.id && cs.serviceID === 7);
        if (service && service.status === 'active') {
            fetchFacebookPosts(clientData.id);
        }
    }, [clientData, clientServiceData]);



    // Jeśli SKU nie jest zdefiniowane, przekieruj użytkownika
    if (!sku) {
        return <Navigate to="/" />;
    }

    if (!clientData || !services.length || !clientServiceData.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col space-y-4">
            <header className="flex justify-between items-center bg-blue-500 text-white p-4">
                <h1>Toucan Nest</h1>
                <h2 className="font-bold text-lg">{clientData && clientData.companyName}</h2>
                <p>{lastMonthDate}</p>
            </header>

            <section className="p-4 bg-white shadow lg:max-w-screen-lg w-full mx-auto">
                <h2 className="font-bold text-lg">Podsumowanie miesiąca</h2>
                <p>Placeholder dla podsumowania miesiąca</p>
            </section>

            {raportSMPostLevel && raportSMPostLevel.status === 'active' && (
                <section className="p-4 bg-white shadow lg:max-w-screen-lg w-full mx-auto">
                    <h2 className="font-bold text-lg">Informacje o postach</h2>
                    {facebookPosts ? (
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Zdjęcie</th>
                                    {Object.keys(facebookPosts[0]).map((key, index) => {
                                        const field = fieldNames.find(f => f.name === key);
                                        if (field && field.isShow) {
                                            return (
                                                <th key={index} className="px-4 py-2 relative group hover:underline hover:text-gray-500 cursor-help">
                                                    {field.prettyName}
                                                    <span className="absolute left-0 botom-15 hidden group-hover:block bg-yellow-200 p-1 rounded text-sm shadow z-10"
                                                        style={{ bottom: '100%', whiteSpace: 'nowrap', fontWeight: 'normal', color: 'black' }}>{field.description}</span>
                                                </th>
                                            );
                                        }
                                        return null;
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {facebookPosts.map((post, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">
                                            {post.postImageUrl && (
                                                <img src={post.postImageUrl} alt="Post" className="w-20 h-20 object-cover" />
                                            )}
                                        </td>
                                        {Object.entries(post).map(([key, value], index) => {
                                            const field = fieldNames.find(f => f.name === key);
                                            if (field && field.isShow) {
                                                return (
                                                    <td key={index} className="border px-4 py-2">{value}{field.postFix}</td>
                                                );
                                            }
                                            return null;
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Brak informacji o postach.</p>
                    )}
                </section>
            )}

            {raportSMAdsAccountLevel && raportSMAdsAccountLevel.length > 0 && (
                <section className="p-4 bg-white shadow lg:max-w-screen-lg w-full mx-auto">
                    <h2 className="font-bold text-lg">Podsumowanie płatnych działań reklamowych</h2>
                    <ul>
                        {raportSMAdsAccountLevel.map((row, index) => (
                            <li key={index}>
                                {Object.entries(row).map(([key, value]) => {
                                    const field = fieldNames.find(f => f.name === key);
                                    if (field && field.isShow && value !== null && value !== 0) {
                                        return (
                                            <p key={key} className="flex justify-between items-center">
                                                <strong className="relative group hover:underline hover:text-gray-500 cursor-help">
                                                    {field.prettyName}
                                                    <span className="absolute left-0 botom-15 hidden group-hover:block bg-yellow-200 p-1 rounded text-sm shadow z-10"
                                                        style={{ bottom: '100%', whiteSpace: 'nowrap', fontWeight: 'normal', color: 'black' }}>{field.description}</span>
                                                </strong>
                                                <span>{value}{field.postFix}</span>
                                            </p>
                                        );
                                    }
                                    return null;
                                })}
                            </li>
                        ))}
                    </ul>
                </section>
            )}        
            </div>
    );
}

export default ClientPanelSM;