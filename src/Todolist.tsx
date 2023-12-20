import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
};


export const Todolist = (props: PropsType) => {

    const [newTasksTitle, setNewTaskTitle] = useState("")
    const onNewTitleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTasksTitle);
            setNewTaskTitle("");
        }
    }
    const onClickButton = () => {
        props.addTask(newTasksTitle);
        setNewTaskTitle("");
    }

    const onClickButtonAll = () => {
        props.changeFilter("All");
    }
    const onClickButtonActive = () => {
        props.changeFilter("Active")
    }
    const onClickButtonCompleted = () => {
        props.changeFilter("Completed")
    }


    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTasksTitle}
                       onChange={onNewTitleTaskChange}
                       onKeyDown={onKeyDown}
                />
                <button onClick={onClickButton}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveTaskClick = () => { props.removeTask(t.id) }
                        return (
                            <li>
                                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                                <button onClick={onRemoveTaskClick}>X</button>
                            </li>)
                    })
                }

            </ul>
            <div>
                <button onClick={onClickButtonAll}>All</button>
                <button onClick={onClickButtonActive}>Active</button>
                <button onClick={onClickButtonCompleted}>Completed</button>
            </div>
        </div>
    )
}
