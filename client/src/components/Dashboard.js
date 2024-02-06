import React from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Email: {currentUser.email}</p>
      <p>Uprawnienia: {currentUser.role}</p>
      <button onClick={handleLogout}>Wyloguj się</button>
    </div>
  );
}

export default Dashboard;