import {useEffect} from "react";

import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";
import {useTasksContext} from "../hooks/useTasksContext";

const Tasks = () => {
    const {tasks, dispatch} = useTasksContext()
    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch('/api/tasks')
            const json = await res.json()

            if (res.ok) {
                dispatch({
                    type: 'SET_CREDS',
                    payload: json
                })
            }
        }

        fetchTasks()
    }, [dispatch])

    return (<div className="home">
        <div className="tasks">
            {tasks && tasks.map((task) => (
                <TaskDetails key={task._id} task={task}/>
            ))}
        </div>
        <div className="task-form">
            <TaskForm/>
        </div>
    </div>)
}

export default Tasks;