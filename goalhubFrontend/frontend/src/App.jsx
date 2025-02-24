import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Task/TaskList';
import { checkAuth } from './services/authService';
import './App.css';
import TaskComponent from './components/Task/TaskComponent';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const auth = checkAuth();
    setIsAuthenticated(auth);
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/api/tasks" element={isAuthenticated ? <TaskList /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/api/tasks" element={isAuthenticated ? <TaskList /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/add-task" element={isAuthenticated ?  <TaskComponent/> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/update-task/:id" element={isAuthenticated ? <TaskComponent /> : <Login setIsAuthenticated={setIsAuthenticated} />} />  
      </Routes>
    </Router>
  );
}

export default App;