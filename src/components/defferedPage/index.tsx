import React, {useEffect} from "react";
import { addArchiveTodo } from "../../services/GetData";
import { useDispatch } from "react-redux";
import { useTypedSelector } from '../../hooks/useTypedSelector'; 
export const DefferedPage = ():any =>{

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(addArchiveTodo())
    }, [])

    const defferedInfo = useTypedSelector(state => state.defferedReducer.defferedTodo)

    useEffect(()=>{
        console.log(defferedInfo)
    },[])


    return(<div>
        Deffered
    </div>)
}