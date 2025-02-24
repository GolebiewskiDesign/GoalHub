import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../styles/Navbar.css";


const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');


  useEffect(() => {
    
    const user = localStorage.getItem('user');
    console.log("LocalStorage user:", user); // Debugowanie
    
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log("Parsed User:", parsedUser); // Sprawdzenie, czy obiekt jest poprawny
      if (parsedUser && parsedUser.username) {
        setUsername(parsedUser.username);
      } else {
        console.warn("Brak właściwości 'name' w obiekcie user");
      }
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbarHeader">
      <Link className='goalHubLogo' to="/api/tasks">GoalHub</Link>
      {isAuthenticated ? (
        <div className="logoutBox">
        <h2 className='registredUserText'>Użytkownik: {username}</h2>
        <button onClick={handleLogout}>Wyloguj się</button>
        </div>
      ) : (
        <div className="loginAndRegisterBox">
          <Link to="/login">Logowanie</Link>
          <Link to="/register">Rejestracja</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;