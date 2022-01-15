import React, { useState, useEffect } from 'react'
import {actionSetDetailPage} from "../../store/todoReducer"
import { useDispatch,useSelector } from "react-redux";
import { push } from 'connected-react-router';
import {  setDataTodo, deleteTodo ,addNewTodo , changeCurrentTodo, setIsComplited , addArchiveTodo,deleteCheckedTodo,getDetailPage } from "../../services/GetData";
import { ModalView } from '../mainPage/components/modalView/index';
import DatePicker from "react-datepicker";
import { Description } from './styled'
import { format } from "date-fns"
import differenceInDays from 'date-fns/differenceInDays'
import parse from 'date-fns/parse';
import '../mainPage/mainPage.css';
enum CategoriesTodo {
    Sport = 'Спорт',  
    Music = 'Музыка',
    Movie = 'Кино',
    Shop = 'Магазин',
  }
const arrayCategories = [CategoriesTodo.Sport , CategoriesTodo.Music, CategoriesTodo.Movie, CategoriesTodo.Shop]
let titleTable = ["Дата создания", "Дата измненения", "Категория", "Заголовок", "Описание" , 'Срок выполнения', 'Cтатус', 'Кнопки действий']
let listDo = ['Удалить', 'Выполнено','Не выполнено', 'Добавить в архив']
function DetailPage({match} :any) {
    const dispatch = useDispatch()
    const todoInfo = useSelector((state:any) => state.todoReducer.detailPage)
    const [idPopUpDelete, setIdPopUpDelete] = useState<any> ();
    const [modalctiveDelete, setModalActiveDelete] = useState<any>(false)
    const [modalActiveChange, setmodalActiveChange] = useState<any>(false);
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

    useEffect(()=>{
        console.log("ddd",todoInfo)
    },[todoInfo])

    let nowdata = format(new Date(), "dd.MM.yyyy")

    const handleExit = () =>{
        dispatch(actionSetDetailPage([]))
        dispatch(push(`/`))
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
        dispatch(push('/'))
    }

    const activeModalChangeMethod = (item:any):any => {
        changeCurrentId(item)
        setmodalActiveChange(true)
    }

    const handleSubmitChange = (e: React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setmodalActiveChange(false)
    }

    const changeCurrentId = (item:any):any =>{
        setCurrentTodo(item)
    }

    const handleCategories = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setCategories(e.target.value)
    }

    const addDefferedTodo = (todo: any) => {
        dispatch(addArchiveTodo(todo))
        // dispatch(deleteTodo(todo.id))
        dispatch(push('/'))
    } 

    const changeTodo = (todoId: any):any => {
        dispatch(changeCurrentTodo(todoId ,nowdata, categories ,title,decription, format(dataendpoint, "dd.MM.yy")))
        setmodalActiveChange(false)
    }

    const handleTitleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    
    const handleDescriptionTodo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
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
                            <button onClick={() => handleCompleted(todo.id, todo.status)}>{todo.status ? listDo[2] : listDo[1]}</button>
                            <button onClick = {() => handeDelete(todo.id)}>{listDo[0]}</button> 
                            <button onClick = {() => activeModalChangeMethod(todo)}>Изменить</button>
                            <button onClick={() => addDefferedTodo(todo)}>Отложить</button>
                        </tr>
                    )
                 })
                }
            </table>
            Детальная страница
            {match.params.id}

            <ModalView active={modalctiveDelete} setActive={setModalActiveDelete}>
                <button onClick={() => setModalActiveDelete(false)}>Закрыть</button>
                <div>Вы действительно хотите удалить задачу?</div>
                <button onClick={handleModalDelete}>Да</button>
                <button onClick={() => setModalActiveDelete(false)}>Нет</button>
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
        </div>
    )
}
export default DetailPage
