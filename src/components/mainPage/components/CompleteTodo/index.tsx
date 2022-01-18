import React , {useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsComplited } from '../../../../services/GetData'
import { ModalView } from '../modalView/index'

interface DeleteTodoProps{
    todo:any;
    component:any;
}

export const CompleteTodo = (props:DeleteTodoProps) => {
    const dispatch = useDispatch()
    const handleCompleted = () => {
        dispatch(setIsComplited(props.todo.id, props.todo.status, props.component))
    }
    return (
        <div>
            <button onClick={handleCompleted}>{props.todo.status ? `Не выполнено` : `Выполнено`}</button>
        </div>
    )
}

