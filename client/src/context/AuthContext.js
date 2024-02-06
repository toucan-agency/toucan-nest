import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

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
      setCurrentUser({ email }); // Uproszczony przykład
    } else {
      throw new Error('Logowanie nieudane');
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Usunięcie tokena
    setCurrentUser(null); // Wyczyszczenie użytkownika
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

