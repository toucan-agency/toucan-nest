import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    return token ? { email, role } : null;
  });

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token); // Zapis tokena
      localStorage.setItem('email', email); // Zapis email
      localStorage.setItem('role', data.role); // Zapis roli
      setCurrentUser({ email, role: data.role });
    } else {
      throw new Error('Logowanie nieudane');
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Usunięcie tokena
    localStorage.removeItem('email'); // Usunięcie email
    localStorage.removeItem('role'); // Usunięcie roli
    setCurrentUser(null); // Wyczyszczenie użytkownika
  };
  
  const createUser = async (email, password, role) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });
  
    if (!response.ok) {
      throw new Error('Nie udało się utworzyć użytkownika');
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    createUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};