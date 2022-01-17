import React , {useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {  setDataTodo, deleteTodo ,addNewTodo , changeCurrentTodo, setIsComplited , addArchiveTodo,deleteCheckedTodo,getDetailPage } from "../../services/GetData";
import { useTypedSelector } from '../../hooks/useTypedSelector'; 
import { ModalView } from '../mainPage/components/modalView/index';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Description } from "./styled"
import { Exit } from "./components/exit";
import { PaginationButton} from "./components/pagination";
import { NavLink } from "react-router-dom";
import './mainPage.css';
import { push } from 'connected-react-router';
import { Button, fabClasses } from "@mui/material";
import { Filters } from "../filters/index"
import { format } from "date-fns"
import parse from 'date-fns/parse';
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import differenceInDays from 'date-fns/differenceInDays'
enum CategoriesTodo {
  Sport = 'Спорт',  
  Music = 'Музыка',
  Movie = 'Кино',
  Shop = 'Магазин',
}
const arrayCategories = [CategoriesTodo.Sport , CategoriesTodo.Music, CategoriesTodo.Movie, CategoriesTodo.Shop] 
let titleTable = ["Дата создания", "Дата измненения", "Категория", "Заголовок", "Описание" , 'Срок выполнения', 'Cтатус', 'Кнопки действий']
let listDo = ['Удалить', 'Выполнено','Не выполнено', 'Добавить в архив']
export const MainPage = () =>{
    const [modalActiveAdd, setmodalActiveAdd] = useState<any>(false);
    const [modalActiveChange, setmodalActiveChange] = useState<any>(false);
    const [modalctiveDelete, setModalActiveDelete] = useState<any>(false)
    const [dataendpoint, setDataendpoint] = useState(new Date()); 
    const [categories, setCategories] = useState<any>("Спорт")
    const [title, setTitle] = useState("")
    const [decription, setDescription] = useState<any>("")
    const [currentTodo, setCurrentTodo] = useState<any>({
        "date-create":"1",
        "data-change":1,
        categories:categories,
        title:title,
        description:decription,
    });
    const [checkedTodos, setCheckedTodos] = useState<any>([]);
    const [idPopUpDelete, setIdPopUpDelete] = useState<any> ();
    const dispatch = useDispatch()

    // const todoInfo = useTypedSelector(state => state.todoReducer.todolist)
    // const currentPage = useTypedSelector(state => state.todoReducer.currentPage)
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

    let nowdata = format(new Date(), "dd.MM.yyyy")
    console.log(dataendpoint)
    console.log("data", parse('22.11.2019', 'dd.MM.yyyy', new Date()).toISOString().substring(0, 10))
    const handleSubmitPopUp = (e: React.ChangeEvent<HTMLFormElement>) =>{
      e.preventDefault()
      dispatch(addNewTodo(nowdata, categories, title , decription, format(dataendpoint, "dd.MM.yyyy")))
    } 

    const handleSubmitChange = (e: React.ChangeEvent<HTMLFormElement>) =>{
      e.preventDefault()
      setmodalActiveChange(false)
    }

    const handleTitleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
    }

    const handleDescriptionTodo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value)
    }

    const handleCategories = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setCategories(e.target.value)
    }

    const changeTodo = (todoId: any):any => {
      dispatch(changeCurrentTodo(todoId ,nowdata, categories ,title,decription, format(dataendpoint, "dd.MM.yy")))
      setmodalActiveChange(false)
    }

    const changeCurrentId = (item:any):any =>{
      setCurrentTodo(item)
    }

    const activeModalChangeMethod = (item:any):any => {
      changeCurrentId(item)
      setmodalActiveChange(true)
    }
    
    const addDefferedTodo = (todo: any) => {
      dispatch(addArchiveTodo(todo))
      dispatch(deleteTodo(todo.id))
    } 
    
    const deleteManyTodos = () => {
      dispatch(deleteCheckedTodo(checkedTodos))
    }

    const saveCheckId  = (event:any, id:any ) => {
      console.log({event,id});
      event.target.checked ? setCheckedTodos([...checkedTodos,id]) : setCheckedTodos(checkedTodos.filter((todoId:any) => id !== todoId))
    }

    const handleCompleted = (id:any, isCompleted: any):any => {
      dispatch(setIsComplited(id,isCompleted))
    }

    const handelOpenPopUp = () =>{
      setModalActiveDelete(true)
    }

    const handeDelete = (id:any):any =>{
      // dispatch(deleteTodo(id))
      setIdPopUpDelete(id)
      handelOpenPopUp();
    }

    const handleModalDelete = (item:any) =>{
      dispatch(deleteTodo(idPopUpDelete))
      setModalActiveDelete(false)
    }

    const handleDetailsPage = (id:number) => {
      dispatch(getDetailPage(id))
    }
    return(<div className="main_page">
       <button onClick={() => setmodalActiveAdd(true)}>Добавить новую задачу</button>
       <button>Список задач</button>
       <button onClick={deleteManyTodos}>Удалить выбранные задачи</button>
       <button onClick={() => dispatch(push("/profile"))}>Профиль</button>
       <button onClick={() => dispatch(push("/archive"))}>Архив</button>
       <Exit/>
       Фильтры
       <Filters/>
        <table> 
          {/* <th>drreterte</th> */}
          {titleTable.map((title:any) => <th>{title}</th>)}
          {
            todoInfo.map((todo:any) => {
              return(
                <tr key = {todo.title}>
                  <td>{todo.datecreate}</td>sd
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
                    <button onClick={() => handleCompleted(todo.id, todo.status)}>{todo.status ? listDo[2] : listDo[1]}</button>
                    <button onClick = {() => handeDelete(todo.id)}>{listDo[0]}</button> 
                    <button onClick = {() => activeModalChangeMethod(todo)}>Изменить</button>
                    <button onClick={() => addDefferedTodo(todo)}>Отложить</button>
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
      <ModalView active={modalActiveAdd} setActive={setmodalActiveAdd}>
        <button onClick={()=>setmodalActiveAdd(false)}>Закрыть</button>
        <form onSubmit = {handleSubmitPopUp}>
          Категории
          <select onChange={handleCategories} required >
            {arrayCategories.map((categories:any) =>  <option>{categories}</option>)}
          </select>
          Заголовок
          <input type = "text" placeholder="Заголовок" required onChange={handleTitleTodo}></input>
          Описание 
          <Description placeholder="Описания"  onChange={handleDescriptionTodo}></Description>
          Крайний срок
          <DatePicker selected={dataendpoint} required onChange={(date:any) => setDataendpoint(date)} />
          <button type ="submit" onClick={()=>setmodalActiveAdd(false)}>Создать задачу </button> 
        </form>
       </ModalView>
      
       <ModalView active={modalActiveChange} setActive={setmodalActiveChange}>
       <button onClick={()=>setmodalActiveChange(false)}>Закрыть</button>
        <form onSubmit={handleSubmitChange}>
          Категории
          <select value={currentTodo.categories} onChange={handleCategories} required >
            {arrayCategories.map((categories:any) =>  <option>{categories}</option>)}
          </select>
          Новый заголовок
          <input type = "text" defaultValue={currentTodo.title} placeholder="Заголовок" required onChange={handleTitleTodo}></input>
          Новое описание
          <Description  defaultValue ={currentTodo.description} placeholder="Описания"  onChange={handleDescriptionTodo}></Description>
          Новый cрок выполнения
          <DatePicker selected={dataendpoint} required onChange={(date:any) => setDataendpoint(date)} />
          <button type ="submit" onClick={()=> changeTodo(currentTodo.id)}>Изменить задачу </button> 
        </form>
      </ModalView>

      <ModalView active={modalctiveDelete} setActive={setModalActiveDelete}>
          <button onClick={() => setModalActiveDelete(false)}>Закрыть</button>
          <div>Вы действительно хотите удалить задачу?</div>
          <button onClick={handleModalDelete}>Да</button>
          <button onClick={() => setModalActiveDelete(false)}>Нет</button>
      </ModalView>
{/* 
      <ModalView active={modalctiveDelete} setActive={setModalActiveDelete}>
          <button onClick={() => setModalActiveDelete(false)}>Закрыть</button>
          <div>Вы действительно Добавить в архив?</div>
          <button onClick={handleModalDelete}>Да</button>
          <button onClick={() => setModalActiveDelete(false)}>Нет</button>
      </ModalView> */}
{/* 
      <ModalView active={modalctiveDelete} setActive={setModalActiveDelete}>
        <form>
          <button>Закрыть</button>
          <div>Вы действительно хотите удалить задачу?</div>
          <button>Да</button>
          <button>Нет</button>
        </form>
      </ModalView> */}
      {/* <ModalView active={modalctiveDelete} setActive={setModalActiveDelete}>
        <form>
          <button>Закрыть</button>
          <div>Вы действительно хотите изменить задачу?</div>
          <button>Да</button>
          <button>Нет</button>
        </form>
      </ModalView>
      <ModalView active={modalctiveDelete} setActive={setModalActiveDelete}>
        <form>
          <button>Закрыть</button>
          <div>Вы действительно хотите добавить задачу?</div>
          <button>Да</button>
          <button>Нет</button>
        </form>
      </ModalView> */}
    </div>)
}