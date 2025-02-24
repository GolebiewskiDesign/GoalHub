import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

const getAllTasks = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response
};


const getTask = async (id) => {
  const response = await axios.get(API_URL+'/'+id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response
};


const createTask = async (task) => {
  const user = JSON.parse(localStorage.getItem('user')); // Pobranie zalogowanego użytkownika
  if (!user) {
      alert("Błąd: Brak zalogowanego użytkownika!");
      return;
  }

    // Dodanie ID zalogowanego użytkownika do zadania
    const taskWithUserId = { 
      ...task, 
      userId: user.id 
    };

  const response = await axios.post(API_URL, taskWithUserId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response;
};

const updateTask = async (id, task) => {
  const user = JSON.parse(localStorage.getItem('user')); 
  if (!user) {
      alert("Błąd: Brak zalogowanego użytkownika!");
      return;
  }


    const taskWithUserId = { 
      ...task, 
      userId: user.id 
    };

  const response = await axios.patch(`${API_URL}/${id}`, taskWithUserId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response;
};


const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const completeTask = async (id) =>{
  await axios.patch(`${API_URL}/${id}/complete`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
  });
  return response;
};



export { getAllTasks,getTask,  createTask, updateTask, deleteTask, completeTask};