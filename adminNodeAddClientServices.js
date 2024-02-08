const ClientService = require('./models/clientservice');

const addClientServices = async () => {
    try {
        // Aktualizacja struktury bazy danych
        await ClientService.sync({ alter: true});

        const clientServicesData = [
            {
                clientID: 1,
                serviceID: 2,
                apiAccountID: 'API12345',
                startDate: '2022-01-01',
                status: 'active',
                otherDetails: 'Szczegóły usługi 1 dla klienta 1'
            },
            {
                clientID: 1,
                serviceID: 4,
                apiAccountID: 'API67890',
                startDate: '2022-02-01',
                status: 'inactive',
                otherDetails: 'Szczegóły usługi 2 dla klienta 1'
            },
            {
                clientID: 3,
                serviceID: 2,
                apiAccountID: 'API11121',
                startDate: '2022-03-01',
                status: 'suspended',
                otherDetails: 'Szczegóły usługi 1 dla klienta 2'
            },
            // Dodaj więcej danych według potrzeb
        ];

        for (const data of clientServicesData) {
            await ClientService.create(data);
        }

        console.log('Dodano wpisy do tabeli ClientService');
    } catch (err) {
        console.error('Nie udało się dodać wpisów do tabeli ClientService', err);
    }
};

addClientServices();