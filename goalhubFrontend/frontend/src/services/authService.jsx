import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const register = async (firstName, lastName, username, password, role) => {
  // Przygotowanie obiektu JSON z danymi użytkownika
  const userData = {
    firstName,   
    lastName,   
    username,   
    password,  
    role        
  };

  console.log("Dane rejestracji:", userData);  

  // Wysyłanie danych do backendu jako JSON
  const response = await axios.post(
    `${API_URL}/register`, 
    userData,  
    {
      headers: {
        'Content-Type': 'application/json',  
        'Accept': 'application/json'         // Oczekiwanie odpowiedzi w formacie JSON
      }
    }
  );

  return response.data;  
};


export const checkAuth = () => {
  return localStorage.getItem('token') !== null;
};