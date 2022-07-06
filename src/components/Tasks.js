import { todoItems } from '../datas/tasks'
import '../styles/Tasks.css'

function Tasks() {
    function checkStatus(value){
        console.log(value)
    }

    return (
            <ul className='task-list'>
                {console.log(todoItems)}
                {todoItems.map(({id, name}) => (
                    <li key={id} className='task-item'>
                    <div className='task-info'>
                    <input type='checkbox' className='checkbutton' onChange={(e) => checkStatus(e.target.value)}></input>
                    <span>{name}</span>
                    </div>
                    <div className='task-buttons'>
                    <button className='edit-button' onClick={() => alert("Modifier")}>Modifier</button>
                    <button className='delete-button' onClick={() => alert("Supprimer")}>Supprimer</button>
                    </div>
                    </li>
                ))}
            </ul>
    );
}

export default Tasks;