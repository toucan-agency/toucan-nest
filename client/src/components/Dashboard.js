import React from 'react';
import { useAuth } from '../context/AuthContext';

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
    <div>
      <h2>Dashboard</h2>
      <p>Email: {currentUser.email}</p>
      <p>Uprawnienia: {currentUser.role}</p>
      <button onClick={handleLogout}>Wyloguj się</button>
      <hr />
      <p>Witaj w panelu administracyjnym Toucan Nest!</p>
      <button onClick={handleTestApi}>Test API</button>
    </div>
  );
}

export default Dashboard;