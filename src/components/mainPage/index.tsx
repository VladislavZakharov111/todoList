import React , {useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {  setDataTodo,deleteCheckedTodo } from "../../services/GetData";
import { getDetailPage } from "./components/detailedPage/GetData"
import "react-datepicker/dist/react-datepicker.css";
import { Exit } from "./components/exit";
import { PaginationButton} from "./components/pagination";
import './mainPage.css';
import { push } from 'connected-react-router';
import { Filters } from "../filters/index"
import parse from 'date-fns/parse';
import differenceInDays from 'date-fns/differenceInDays'
import { DeleteTodo } from "./components/DeleteTodo/index"
import { ArchiveTodo } from "./components/ArchiveTodo";
import { CompleteTodo } from "../mainPage/components/CompleteTodo/index"
import { ChangeTodo } from "./components/ChangeTodo/index"
import { AddTodo } from "./components/AddTodo/index"
import { titleTable, listDo } from "./constants"
let component = 'Main'
export const MainPage = () =>{
   
    const [checkedTodos, setCheckedTodos] = useState<any>([]);
    const dispatch = useDispatch()
    const todoInfo = useSelector((state:any) => state.todoReducer.todolist)
    const currentPage = useSelector((state:any) => state.todoReducer.currentPage)
    const categoriesRedux = useSelector((state:any) => state.todoReducer.categories)
    const titleRedux = useSelector((state:any) => state.todoReducer.title)
    const doneTaskRedux = useSelector((state:any) => state.todoReducer.doneTask)
    const sortRedux = useSelector ((state:any) => state.todoReducer.sort)
    
    useEffect(() => {
      console.log(categoriesRedux,titleRedux,doneTaskRedux,sortRedux)
      dispatch(setDataTodo(currentPage,titleRedux,categoriesRedux,doneTaskRedux,sortRedux))
    },[currentPage,categoriesRedux,titleRedux,doneTaskRedux,sortRedux])
    
    const deleteManyTodos = () => {
      dispatch(deleteCheckedTodo(checkedTodos))
    }

    const saveCheckId  = (event:any, id:any ) => {
      console.log({event,id});
      event.target.checked ? setCheckedTodos([...checkedTodos,id]) : setCheckedTodos(checkedTodos.filter((todoId:any) => id !== todoId))
    }

    const handleDetailsPage = (id:number) => {
      dispatch(getDetailPage(id))
    }

    return(<div className="main_page">
      <AddTodo/>
       <button>Список задач</button>
       <button onClick={deleteManyTodos}>Удалить выбранные задачи</button>
       <button onClick={() => dispatch(push("/profile"))}>Профиль</button>
       <button onClick={() => dispatch(push("/archive"))}>Архив</button>
       <Exit/>
       Фильтры
       <Filters/>
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
                  <td>
                    <CompleteTodo todo = {todo}  component = {component}/>
                    <DeleteTodo id = {todo.id} component = {component}/>
                    <ChangeTodo todo = {todo}  component = {component}/>
                    <ArchiveTodo todo = {todo} component = {component} />
                    <button onClick={() => handleDetailsPage(todo.id)}> Детальная страница </button> 
                    <input type ="checkbox" onChange={(event) => saveCheckId(event,todo.id)}/>
                    <p>
                      {
                          Math.abs(differenceInDays(
                            new Date(new Date().toISOString().substring(0, 10)),
                            new Date(parse(todo.dateendpoint, 'dd.MM.yyyy', new Date()).toISOString().substring(0, 10))
                          ))
                      }
                    </p>
                  </td>
                </tr>
              )
            })
          }
      </table> 
      <PaginationButton/>
    </div>)
}