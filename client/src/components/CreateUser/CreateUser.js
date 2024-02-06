import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const { currentUser, createUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  if (!currentUser || currentUser.role !== 'admin') {
    return <p>Nie masz uprawnień do przeglądania tej strony.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password, role);
      setUserCreated(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      setError('Nie udało się utworzyć użytkownika. ' + err.message);
    }
  };

  return (
    <div>
      <h1>Utwórz nowego użytkownika</h1>
      {userCreated && <p>Pomyślnie stworzono użytkownika</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Hasło:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Rola:
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Wybierz rolę</option>
            <option value="admin">Admin</option>
            <option value="worker">Worker</option>
            <option value="client">Client</option>
          </select>
        </label>
        <button type="submit">Utwórz użytkownika</button>
      </form>
    </div>
  );
}

export default CreateUser;