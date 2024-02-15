import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


function Dashboard() {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleTestApi = async () => {
    const testObject = {
      accountID: "act_2083166652074039",
      clientId: 8,
      since: "2024-01-01",
      until: "2024-01-31"
    };
    try {
      const response = await fetch(`/api/meta_api/reportSMAdsAccountLevel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testObject)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Błąd:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-2"><strong>Email:</strong> {currentUser.email}</p>
      <p className="mb-4"><strong>Uprawnienia:</strong> {currentUser.role}</p>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Wyloguj się</button>
      <hr className="my-4" />
      <p className="mb-4">Witaj w panelu administracyjnym Toucan Nest!</p>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/create-user" className="bg-blue-500 text-white px-4 py-2 rounded block text-center">Utwórz użytkownika</Link>
        <Link to="/manage-services" className="bg-blue-500 text-white px-4 py-2 rounded block text-center">Zarządzaj usługami</Link>
        <Link to="/client-manage" className="bg-blue-500 text-white px-4 py-2 rounded block text-center">Zarządzaj klientami</Link>
        <Link to="/add-monthly-summary" className="bg-blue-500 text-white px-4 py-2 rounded block text-center">Dodaj podsumowanie miesiąca</Link>
      </div>
    </div>
  );
}

export default Dashboard;