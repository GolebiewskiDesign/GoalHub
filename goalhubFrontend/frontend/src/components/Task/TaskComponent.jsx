import React, { useEffect } from 'react'
import {useState} from "react";
import { createTask, getTask, updateTask } from '../../services/taskService';
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/TaskComponent.css";

const TaskComponent = () => {
   
 const [title,setTitle] = useState("")
 const [description, setDescription] = useState("")
 const [priority, setPriority] = useState("BRAK")
 const [status, setStatus] = useState("DO_ZROBIENIA")
 const [startDate, setStartDate] = useState("")
 const [finishDate, setFinishDate] = useState("")
 const [completed, setCompleted] = useState(false)
 const [userId, setUserId]= useState()
 const navigate = useNavigate();
 const { id } = useParams();


 function saveOrEditTask(e){
    //Dodawanie nowego zadania
        e.preventDefault()
        const task = {title,description, priority, status, startDate, finishDate, completed}
        console.log(task);
    

        if(id){
            updateTask(id, task).then((response)=>{
                navigate("/api/tasks");
            }).catch(error =>{
                console.log(error);
            });
        }else{
            createTask(task).then((response)=>{
                navigate("/api/tasks");
            }).catch(error =>{
                console.log(error);
            });
        }
    
 }


 function pageTitle(){
    if(id){
       return <h2 className="text-center">Zaktualizuj Zadanie:</h2>
    }else{
        return <h2 className="text-center">Dodaj Zadanie:</h2>
    }
 }


 function taskButton (){
    if(id){
        return <button className='addTaskButton' onClick={(e) => saveOrEditTask(e)}>Zaktualizuj zadanie</button>
    }else{
        return <button className='addTaskButton' onClick={(e) => saveOrEditTask(e)}>Dodaj zadanie</button>
    }
 }

 useEffect( () => {
    if(id){
        getTask(id).then((response)=>{
            console.log(response.data);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setPriority(response.data.priority);
            setStatus(response.data.status);
            setStartDate(response.data.startDate? response.data.startDate.slice(0, 10):"");
            setFinishDate(response.data.finishDate?response.data.finishDate.slice(0, 10):"");
            setCompleted(response.data.completed);
        }).catch(error=>{
            console.error(error);
        })
    }
 },[id])


  return (
   <div className='container addTaskLogo'>
    <br />
    <br />
    <div className='card col-md-6  offset-md-3 addTaskHeader'>
       { pageTitle() }
        <div className='card-body addTaskBox'>
            <form>
                <div className='form-group mb-2'>
                    <label className='form-label white'>Tytuł:</label>
                    <input
                    className='form-control'
                    type="text"
                    placeholder='Wpisz tytuł zadania'
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    >
                    </input>
                </div>


                <div className='form-group mb-2'>
                    <label className='form-label white'>Opis:</label>
                    <input
                    className='form-control'
                    type="text"
                    placeholder='Wpisz opis zadania'
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    >
                    </input>
                </div>


                <div className='form-group mb-2'>
                    <label className='form-label white'>Priorytet:</label>
                    <select 
                    className='form-control'
                    value={priority}
                    onChange={(e)=> setPriority(e.target.value)}
                    >
                        <option value="BRAK">
                            Brak
                        </option>
                        <option value="BARDZO_NISKI">
                            Bardzo niski
                        </option>
                        <option value="ŚREDNI">
                            Średni
                        </option>
                        <option value="WYSOKI">
                            Wysoki
                        </option>
                        <option value="PILNY">
                            Pilny
                        </option>
                        <option value="KRYTYCZNY">
                            Krytyczny
                        </option>

                    </select>
                </div>



                <div className='form-group mb-2'>
                    <label className='form-label white'>Status:</label>
                    <select 
                    className='form-control'
                    value={status}
                    onChange={(e)=> setStatus(e.target.value)}
                    >
                        <option value="DO_ZROBIENIA">
                            Do zrobienia
                        </option>
                        <option value="ODWOŁANE">
                            Odwołane
                        </option>
                        <option value="NIE_ROZPOCZĘTE">
                            Nie rozpoczęte
                        </option>
                        <option value="W_TRAKCIE">
                            W trakcie
                        </option>
                        <option value="UKOŃCZONE">
                            Ukończone
                        </option>
                        <option value="ZARCHIWIZOWANE">
                            Zarchizowane
                        </option>

                    </select>
                </div>

                <div className='form-group mb-2'>
                <label className='form-label white'>Data rozpoczęcia:</label>
                <input
                type="date"
                 name="startDate"
                 className='form-control'
                    value={startDate? startDate.slice(0, 10): ""}
                onChange={(e) => setStartDate(e.target.value)}
                />
                 </div>


                 <div className='form-group mb-2'>
                <label className='form-label white'>Data zakończenia:</label>
                <input
                type="date"
                className='form-control'
                 name="finishDate"
                    value={finishDate? finishDate.slice(0,10): ""}
                onChange={(e) => setFinishDate(e.target.value)}
                />
                 </div>


                <div className='form-group mb-2'>
                    <label className='form-label white'>Ukończone:</label>
                    <select 
                    className='form-control'
                    value={completed}
                    onChange={(e)=> setCompleted(e.target.value)}
                    >
                        <option value={false}>
                            Nie
                        </option>
                        <option value={true}>
                            Tak
                        </option>

                    </select>
                </div>

                {taskButton()}
            </form>
        </div>
    </div>
    <br />
    <br />
   </div>

  )
}

export default TaskComponent
