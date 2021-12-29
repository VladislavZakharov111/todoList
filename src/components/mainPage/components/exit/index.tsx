import React from "react"
import { useDispatch } from "react-redux"
import {deleteexit} from "../../../../store/todoReducer"
import { push } from 'connected-react-router'
export const Exit = () =>{

    const dispatch = useDispatch()

    const handlerExit = () => {
        //routing
        dispatch(deleteexit([]))
        dispatch(push("/auth"))
    }
    return(<div>
        <button onClick={handlerExit}>Выйти</button>
    </div>)
}