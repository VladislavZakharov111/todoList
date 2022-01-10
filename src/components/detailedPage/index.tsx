import React, { useEffect } from 'react'
import {actionSetDetailPage} from "../../store/todoReducer"
import { useDispatch,useSelector } from "react-redux";
import { push } from 'connected-react-router';

let titleTable = ["Дата создания", "Дата измненения", "Категория", "Заголовок", "Описание" , 'Срок выполнения', 'Cтатус', 'Кнопки действий']

function DetailPage({match} :any) {
    const dispatch = useDispatch()
    const todoInfo = useSelector((state:any) => state.todoReducer.detailPage)
    
    useEffect(()=>{
        console.log("ddd",todoInfo)
    },[todoInfo])

    const handleExit = () =>{
        dispatch(actionSetDetailPage([]))
        dispatch(push(`/`))
    }
    
    return (
        <div>
            <button onClick={handleExit}>Назад</button>
            <table>
                {titleTable.map((title:any) => <th>{title}</th>)}
                {
                    todoInfo.map((todo:any) => {
                        return(
                        <tr key = {todo.title}>
                            <td>{todo.datecreate}</td>
                            <td>{todo.datachange}</td>
                            {/* <td><p className={todo.status ? "do" : "nodo"}>{todo.categories}</p></td>
                            <td><p className={todo.status ? "do" : "nodo"}>{todo.title}</p></td>
                            <td><p className={todo.status ? "do" : "nodo"}>{todo.description}</p></td> */}
                        </tr>
                    )
                 })
                }
            </table>
            Детальная страница
            {match.params.id}
        </div>
    )
}
export default DetailPage
