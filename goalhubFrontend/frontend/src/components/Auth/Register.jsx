import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import "../../styles/Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]= useState("USER");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(firstName, lastName, username, password, role);
      navigate('/login');
    } catch (err) {
      setError('Registration failed'+err);
    }
  };

  return (
    <div className="registerLogo registerContainer">
      <h2 className='registerTitle'>Rejestracja</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="Imię"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
         <input
          type="text"
          placeholder="Nazwisko"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         
        <button className='registerButton' type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Register;