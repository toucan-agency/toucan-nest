import React, { useState, useEffect } from 'react';

function ManageService() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await fetch('/api/services');
    const data = await response.json();
    setServices(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchServices();
  };

  const handleDelete = async (serviceID) => {
    await fetch(`/api/services/${serviceID}`, {
      method: 'DELETE',
    });
    fetchServices();
  }

  return (
    <div>
      <h2>Zarządzanie usługami</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nazwa usługi"
          required
        />
        <button type="submit">Dodaj usługę</button>
      </form>
      <ul>
        {services.map((service) => (
          <li key={service.serviceID}>{service.name}<button onClick={() => handleDelete(service.serviceID)}>Usuń</button></li>
          
        ))}
      </ul>
    </div>
  );
}

export default ManageService;
