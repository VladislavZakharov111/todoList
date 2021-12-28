import React, {useEffect} from "react";
import { getArchiveTodo } from "../../services/GetData";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from '../../hooks/useTypedSelector'; 
export const DefferedPage = ():any =>{

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getArchiveTodo())
    }, [])

    // const defferedInfo = useTypedSelector(state => state.defferedReducer.defferedTodo)
    const defferedInfo = useSelector((state:any) => state.defferedReducer.defferedTodo)
    useEffect(()=>{
        console.log("deffered", defferedInfo)
    },[])

    return(
        <div>
            <div>Отложенные задачи</div>
            <table>
            {defferedInfo.map((todo:any) =>{
                    return(
                        <tr key = {todo.title}>
                        <td>{todo.todo.datecreate}</td>
                        <td>{todo.todo.datachange}</td>
                        <td>{todo.todo.categories}</td>
                        <td>{todo.todo.title}</td>
                        <td>{todo.todo.description}</td>
                        <td>
                            {/* <button onClick={() => handleCompleted(todo.id, todo.status)}>Выполнено</button>
                            <button onClick = {() => handeDelete(todo.id)}>Удалить</button> 
                            <button onClick = {() => activeModalChangeMethod(todo)}>Изменить</button>
                            <button onClick={() => addDefferedTodo(todo)}>Отложить</button>
                            <input type ="checkbox" onChange={(event) => saveCheckId(event,todo.id)}/> */}
                            Кнопки
                        </td>
                        </tr>
                    )
                    })
            }
            </table>
        </div>
    )
}