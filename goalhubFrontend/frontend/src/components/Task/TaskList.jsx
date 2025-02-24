import React, { useEffect, useState } from 'react';
import { getAllTasks, deleteTask, completeTask } from '../../services/taskService';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import '../../styles/TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    listTasks();
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.username) {
        setUsername(parsedUser.username);
      }
    }
  }, []);

  function listTasks() {
    getAllTasks().then((response) => {
      setTasks(response.data);
    }).catch(error => {
      console.error(error);
    });
  }

  function addNewTask() {
    navigate('/add-task');
  }

  function updateTask(id) {
    navigate(`/update-task/${id}`);
  }

  function removeTask(id) {
    deleteTask(id).then(() => {
      listTasks();
    }).catch(error => {
      console.error(error);
    });
  }



  const analyzeTasks = () => {
    const priorityCount = {};
    const statusCount = {};
    let completedTasks = 0;
    let ongoingTasks = 0;

    const currentDate = new Date();
    
    tasks.forEach(task => {
      priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
      statusCount[task.status] = (statusCount[task.status] || 0) + 1;

      const finishDate = new Date(task.finishDate);
      if (finishDate < currentDate) {
        completedTasks++;
      } else {
        ongoingTasks++;
      }
    });

    return { priorityCount, statusCount, completedTasks, ongoingTasks };
  };

  const { priorityCount, statusCount, completedTasks, ongoingTasks } = analyzeTasks();

  const priorityData = Object.keys(priorityCount).map(key => ({ name: key, Liczba: priorityCount[key] }));
  const statusData = Object.keys(statusCount).map(key => ({ name: key, Liczba: statusCount[key] }));
  const dateData = [
    { name: 'Deadline minął', Liczba: completedTasks, fill: '#FF4500' },
    { name: 'Trwające według daty', Liczba: ongoingTasks, fill: '#1E90FF' }
  ];

  return (
    <div className='container taskListContainer' style={{margin:0}}>
      <h2 className='text-center white'>Witaj {username}, Twoja lista zadań: </h2>
      <button className='addTask' onClick={addNewTask}>Dodaj Zadanie</button>

      <table className='table table-bordered table-striped '>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tytuł</th>
            <th>Opis</th>
            <th>Priorytet</th>
            <th>Status</th>
            <th>Start</th>
            <th>Koniec</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.taskId}>
              <td>{task.taskId}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>{task.startDate ? task.startDate.slice(0, 10) : ''}</td>
              <td>{task.finishDate ? task.finishDate.slice(0, 10) : ''}</td>
              <td>
                <button className='updateButton' onClick={() => updateTask(task.taskId)}>Zaktualizuj</button>
                <button className='btn btn-danger' onClick={() => removeTask(task.taskId)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className='text-center white'>Liczba zadań według priorytetu</h3>
      <BarChart width={600} height={300} data={priorityData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='Liczba' fill='#FF6347' />
      </BarChart>

      <h3 className='text-center white'>Liczba zadań według statusu</h3>
      <BarChart width={600} height={300} data={statusData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='Liczba' fill='#32CD32' />
      </BarChart>

      <h3 className='text-center white'>Analiza deadline'u:</h3>
      <BarChart width={600} height={300} data={dateData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='Liczba' fill={({ payload }) => payload.fill} />
      </BarChart>
    </div>
  );
}

export default TaskList;
