import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "All" | "Completed" | "Active";

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {"id": v1(), "title": "HTML & CSS", "isDone": true},
        {"id": v1(), "title": "JS", "isDone": true},
        {"id": v1(), "title": "ReactJS", "isDone": false},
        {"id": v1(), "title": "rest api", "isDone": false},
        {"id": v1(), "title": "graphQL", "isDone": false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("All");


    let tasksForTodolist = tasks;
    if(filter === "Completed"){
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if(filter === "Active"){
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }


    function changeFilter (value: FilterValuesType){
        setFilter(value)
    }
    function removeTask(id: string) {
        let filteredTask = tasks.filter(t=> t.id != id);
        setTasks(filteredTask);
    }
    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    return (
        <div className="App">
            <Todolist  title="What to learn"
                       tasks={tasksForTodolist}
                       removeTask={removeTask}
                       changeFilter={changeFilter}
                       addTask={addTask}
            />
        </div>
    );
}

export default App;
