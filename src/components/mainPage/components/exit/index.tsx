import React from "react"
import { useDispatch } from "react-redux"
import {deleteexit} from "../../../../store/todoReducer"
export const Exit = () =>{

    const dispatch = useDispatch()

    const handlerExit = () => {
        //routing
        dispatch(deleteexit([]))
    }
    return(<div>
        <button onClick={handlerExit}>Выйти</button>
    </div>)
}