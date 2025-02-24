import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import "../../styles/Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({ username })); 
      setIsAuthenticated(true);
      navigate('/api/tasks');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="loginContainer">
      <h2 className="loginTitle">Zaloguj się</h2>
      <form onSubmit={handleSubmit}>
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
        {error && <p className='loginError'>{error}</p>}
        <button className='loginButton' type="submit">Zaloguj się</button>
      </form>
    </div>
  );
};

export default Login;