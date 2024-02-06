import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ChangePassword = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <p>Musisz być zalogowany, aby zobaczyć tę stronę.</p>;
  }

  return (
    <div>
      <h1>Zmień hasło</h1>
      {/* Formularz do zmiany hasła */}
    </div>
  );
}

export default ChangePassword;