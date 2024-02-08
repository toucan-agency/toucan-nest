import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateUser from './components/CreateUser/CreateUser';
import ManageService from './components/ManageService/ManageService';
import ClientManage from './components/ClientManage/ClientManage';
import ClientPanelSM from './components/ClientPanelSM/ClientPanelSM';

function App() {
  const { currentUser } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/create-user" element={currentUser && currentUser.role === 'admin' ? <CreateUser /> : <Navigate to="/" />} />
        <Route path="/manage-services" element={currentUser && currentUser.role === 'admin' ? <ManageService /> : <Navigate to="/" />} />
        <Route path="/client-manage" element={currentUser && currentUser.role === 'admin' ? <ClientManage /> : <Navigate to="/" />} />
        <Route path="/raport-sm/:sku" element={currentUser ? <ClientPanelSM /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;