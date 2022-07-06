import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../styles/App.css';
import logo from '../assets/logo.svg'
import trash from '../assets/trash-outline.svg'
import pencil from '../assets/pen-solid.svg'
import Popup from './Popup';
import { format } from 'date-fns'
import validator from 'validator'

function App() {
    const url = 'http://127.0.0.1:8000/'

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputTask_title, setinputTask_title] = useState('');
    const [inputTask_descr, setinputTask_descr] = useState('');
    const [inputTask_limit, setinputTask_limit] = useState('');
    const [activeTask, setactiveTask] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isDetailOpen, setDetailIsOpen] = useState(false);
    const [displayCompleted, setdisplayCompleted] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        if(isOpen){
            setinputTask_title('');
            setinputTask_descr('');
            setinputTask_limit('');}
      }
     
    const toggleDetailPopup = () => {
        setDetailIsOpen(!isDetailOpen);
      }

    const getAllTask = () => {
        setIsLoading(true);
        axios.get(url + 'todo/list/')
        .then(res => {
            setTasks(res.data);
            setIsLoading(false);
        })
        .catch( err => {
            console.error(err);
            setIsLoading(false);}
        )}

    const handleTitleChange = (e) => {
        setinputTask_title(e.target.value);
    }

    const handleDescrChange = (e) => {
        setinputTask_descr(e.target.value);
    }

    const handleDateChange = (e) => {
        setinputTask_limit(e.target.value);
    }

    const addTask = () => {
        if(activeTask === null){
            axios.post(url + 'todo/add/', {
            'name': inputTask_title,
            'description': inputTask_descr,
            'limit': inputTask_limit,
            'status': false
            }).then(res => {
                setinputTask_title('');
                setinputTask_descr('');
                setinputTask_limit('');
                getAllTask();
                setactiveTask(null)
                setIsOpen(!isOpen)
            }).catch(err => {
                console.error(err)
            })}
        else{
            axios.put(url + `todo/${activeTask.id}/update/`, {
            'name': inputTask_title,
            'description': inputTask_descr,
            'limit': inputTask_limit,
            'status': activeTask.status
            }).then(res => {
                setinputTask_title('')
                setinputTask_descr('')
                setinputTask_limit('')
                getAllTask()
                setactiveTask(null)
                setIsOpen(!isOpen)
            }).catch(err => {
                console.error(err)
            })
        }}

    const deleteTask = (task) => {
        axios.delete(url + `todo/${task.id}/delete/`)
        .then(res => {
            getAllTask()
        })
        .catch(err => {
            console.error(err)
        })}

    const toggleStatus = (task) => {
        axios.put(url + `todo/${task.id}/update/`, {
            'name': task.name,
            'status': !task.status, 
            }).then(res => {
            setinputTask_title('');
            getAllTask();
        }).catch(err => {
            console.error(err)
            })}

    const updateTask = (task) => {
        setactiveTask(task)
        setinputTask_title(task.name)
        setinputTask_descr(task.description)
        setinputTask_limit(task.limit)
        togglePopup()
        }

    const showDetails = (task) => {
        setactiveTask(task)
        setinputTask_title(task.name)
        setinputTask_descr(task.description)
        setinputTask_limit(task.limit)
        toggleDetailPopup()        
    }

    const changeCompleteDisplay = (status) => {
        setdisplayCompleted(status)
    }

    useEffect(() => {
    getAllTask()
    }, [])

    return (
    <div className='App'>
        <header className='App-header'>
        <p>
            <img src={logo} className='App-logo' alt='logo'></img>
            My To Do List
        </p>
        </header>
    <div className="main">

        <div className="input-task">
        <button className='addtask-btn' onClick={togglePopup}>
                Add task
        </button>
        <div className='task-status-btn'>
        <button className={`${!displayCompleted ? "selected" : "unselected"}-btn`} onClick={() => changeCompleteDisplay(false)}>
                To do
        </button>
        <button className={`${displayCompleted ? "selected" : "unselected"}-btn`} onClick={() => changeCompleteDisplay(true)}>
                Done
        </button>
        </div>

        {isOpen && <Popup
        content={<>
            <p className='popup-title'><b>Add task</b></p>
            <div className='popup-content'></div>
            <form className='popup-content'>
            <div className='input-div'>
                <label htmlFor="todo-name">Title</label>
                <input
                type="text"
                placeholder="Enter your task title..."
                className="text"
                value={inputTask_title}
                onChange={e => handleTitleChange(e)}
                />
            </div>
            <div className='input-div'>
                <label htmlFor="todo-description">Description</label>
                <input
                type="text"
                placeholder="Enter your task description..."
                className="text"
                value={inputTask_descr}
                onChange={e => handleDescrChange(e)}
                />
            </div>
            <div className='input-div'>
                <label htmlFor="limit">Due date</label>
                <input type="date" className="date" value={inputTask_limit} onChange={e => handleDateChange(e)}/>
                {/* <input type="submit"> */}
            </div>
            </form>
            <button onClick={addTask}>Save</button>
        </>}
        handleClose={togglePopup}/>}
    
        {isDetailOpen && <Popup
        content={<>
            <p className='popup-title'><b>{inputTask_title}</b></p>
            <div className='popup-content'>
                <p><b>Description</b><br/>{inputTask_descr}</p>
                <p><b>Due date</b><br/>{format(new Date(inputTask_limit), 'dd/MM/yyyy')}</p>
            </div>
        </>}
        handleClose={toggleDetailPopup}/>}

        <ul>
            {
            isLoading === true
                ? <h4> Is loading ... </h4>
                : tasks.map((task) => {
            return(
            <div className="task-list" key={task.id}>
                {(() => {
                if (task.status && displayCompleted) {
                    return (
                    <div className="task-list" key={task.id}>
                        <input
                            type="checkbox"
                            className="checkbox"
                            onChange={e => toggleStatus(task)}
                            checked={task.status}
                        />                           
                        <li className='task-item' onClick={e => {showDetails(task)}}>
                            {task.name }
                        </li>
                        <div className="button-div">
                            <button className="edit-button" onClick={e => {updateTask(task)}}>
                                <img src={pencil} className='App-pencil' alt='pencil'></img>
                            </button>
                            <button
                                className="delete-button"
                                onClick={e => {deleteTask(task)}}>
                                    <img src={trash} className='App-trash' alt='trash'></img>
                            </button>
                        </div>
                    </div>
                    )

                } else if (!task.status && !displayCompleted) {
                return (
                    <div className="task-list" key={task.id}>
                        <input
                            type="checkbox"
                            className="checkbox"
                            onChange={e => toggleStatus(task)}
                            checked={task.status}
                        />
                        <li className='task-item' onClick={e => {showDetails(task)}}>
                            {task.name }
                        </li>
                        <div className="button-div">
                            <button className="edit-button" onClick={e => {updateTask(task)}}>
                                <img src={pencil} className='App-pencil' alt='pencil'></img>
                            </button>
                            <button
                                className="delete-button"
                                onClick={e => {deleteTask(task)}}>
                                    <img src={trash} className='App-trash' alt='trash'></img>
                            </button>
                        </div>
                    </div>
                )
                    }})()}

            </div>)
            })
        }
        </ul>
        </div>
    </div>
    </div>
    );
}

export default App;
