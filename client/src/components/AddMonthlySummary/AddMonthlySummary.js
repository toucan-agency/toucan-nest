import React, { useState, useEffect } from 'react';

function AddMonthlySummary() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const [year, setYear] = useState(lastMonth.getFullYear().toString());
  
  const [month, setMonth] = useState('1'); // Ustaw domyślną wartość na 1
  const [description, setDescription] = useState('');
  const [reportLink, setReportLink] = useState('');


  const fetchClients = async () => {
    const response = await fetch('/api/clientservices/clients_with_service/9');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      setClients(data);
    }
  };

  /* 
0 {clientServiceID: 19, clientID: 5, serviceID: 9, apiAccountID: null, startDate: "2024-02-09", status: "active"}
1 {clientServiceID: 23, clientID: 6, serviceID: 9, apiAccountID: null, startDate: "2024-02-09", status: "active"}
2 {clientServiceID: 25, clientID: 8, serviceID: 9, apiAccountID: null, startDate: "2024-02-09", status: "active"}

  */
  
  useEffect(() => {
    fetchClients();
  }, []);

  const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const paddedMonth = month.padStart(2, '0');
    const date = `${year}-${paddedMonth}-01`;

    console.log(selectedClient);

    fetch('/api/monthly_summaries/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: selectedClient,
        month: date,
        description: description,
        reportLink: reportLink
      }),
    });
  };

  return (
    <div className="p-4">
    <h1 className="text-xl mb-4">Dodaj podsumowanie miesiąca</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <div>
          <label className="block">Klient</label>
          <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} className="w-full p-2 border rounded">
  {clients.filter(client => client.status === 'active').map(client => (
    <option key={client.clientID} value={client.clientID.toString()}>{client.companyName}</option>
  ))}
</select>
        </div>
        <div>
          <label className="block">Rok</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block">Miesiąc</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full p-2 border rounded">
            {months.map((monthName, index) => (
              <option key={index} value={index + 1}>{monthName}</option>
            ))}
          </select>
        </div>
      </div>
        <div>
          <label className="block">Opis</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block">Link do faktur</label>
          <input type="text" value={reportLink} onChange={(e) => setReportLink(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Zapisz</button>
      </form>
    </div>
  );
}

export default AddMonthlySummary;