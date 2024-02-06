import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser } = useAuth(); // Zakładając, że useAuth zwraca aktualnego użytkownika

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={currentUser ? <Dashboard /> : <Navigate to="/login" />} 
        />
        {/* Możesz dodać więcej chronionych tras w podobny sposób */}
      </Routes>
    </Router>
  );
}

export default App;