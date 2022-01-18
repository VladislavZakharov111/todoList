import React, { useState, useEffect } from 'react'
import {actionSetDetailPage} from "../../../../store/todoReducer"
import { useDispatch,useSelector } from "react-redux";
import { push } from 'connected-react-router';
import {  setDataTodo, deleteTodo ,addNewTodo , changeCurrentTodo, setIsComplited , addArchiveTodo,deleteCheckedTodo } from "../../../../services/GetData";
import { ModalView } from '../modalView/index';
import DatePicker from "react-datepicker";
import { Description } from './styled'
import { format } from "date-fns"
import differenceInDays from 'date-fns/differenceInDays'
import parse from 'date-fns/parse';
import { DeleteTodo } from "../DeleteTodo/index"
import { ArchiveTodo } from "../ArchiveTodo/index";
import { CompleteTodo } from "../CompleteTodo/index"
import { ChangeTodo } from "../ChangeTodo/index"
import { titleTable, listDo } from "../../constants"

const component = 'detailed';

function DetailPage({match} :any) {
    const dispatch = useDispatch()
    const todoInfo = useSelector((state:any) => state.todoReducer.detailPage)
   
    useEffect(()=>{
        console.log("ddd",todoInfo)
    },[todoInfo])

    let nowdata = format(new Date(), "dd.MM.yyyy")

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
                            <td><p className={todo.status ? "do" : "nodo"}>{todo.categories}</p></td>
                            <td><p className={todo.status ? "do" : "nodo"}>{todo.title}</p></td>
                            <td><p className={todo.status ? "do" : "nodo"}>{todo.description}</p></td>
                            <td className=
                                {
                                Math.abs(differenceInDays(
                                    new Date(new Date().toISOString().substring(0, 10)),
                                    new Date(parse(todo.dateendpoint, 'dd.MM.yyyy', new Date()).toISOString().substring(0, 10))
                                )) <= 3 ? 'HotEndpointData' : 'noHotEndpointData' 
                                }
                            >{todo.dateendpoint} </td>
                            <td>{todo.status ? listDo[1] : listDo[2] }</td>
                            <CompleteTodo todo = {todo}  component = {component} />
                            <DeleteTodo id = {todo.id} component = {component} />
                            <ChangeTodo todo = {todo}  component = {component} />
                            <ArchiveTodo todo = {todo} component = {component}  />
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
