import React , {useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { changeCurrentTodo } from '../../../../services/GetData'
import { ModalView } from '../modalView/index'
import DatePicker from "react-datepicker";
import { Description } from "../../../mainPage/styled"
import { format } from "date-fns"

interface DeleteTodoProps{
    todo:any;
}
enum CategoriesTodo {
    Sport = 'Спорт',  
    Music = 'Музыка',
    Movie = 'Кино',
    Shop = 'Магазин',
  }
const arrayCategories = [CategoriesTodo.Sport , CategoriesTodo.Music, CategoriesTodo.Movie, CategoriesTodo.Shop] 

export const  ChangeTodo = (props:DeleteTodoProps ) => {

    let nowdata = format(new Date(), "dd.MM.yyyy")

    const [modalActiveChange, setmodalActiveChange] = useState<any>(false);
    const [dataendpoint, setDataendpoint] = useState(new Date()); 
    const [categories, setCategories] = useState<any>("Спорт")
    const [title, setTitle] = useState("")
    const [decription, setDescription] = useState<any>("")
    const dispatch = useDispatch()

    console.log(props)

    const handleSubmitChange = (e: React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setmodalActiveChange(false)
    }

    const changeTodo = () => {
        dispatch(changeCurrentTodo(props.todo.id ,nowdata, categories ,title,decription, format(dataendpoint, "dd.MM.yy")))
        // setmodalActiveChange(false)
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
    return (
        <div>
            <button onClick={() => setmodalActiveChange(true)}> Изменить</button>
            <ModalView active={modalActiveChange} setActive={setmodalActiveChange}>
                <button onClick={()=>setmodalActiveChange(false)}>Закрыть</button>
                <form onSubmit={handleSubmitChange}>
                    Категории
                    <select defaultValue = {props.todo.categories} onChange={handleCategories} required >
                        {arrayCategories.map((categories:any) =>  <option>{categories}</option>)}
                    </select>
                    Новый заголовок
                    <input type = "text" defaultValue={props.todo.title} placeholder="Заголовок" required onChange={handleTitleTodo}></input>
                    Новое описание
                    <Description  defaultValue = {props.todo.description} placeholder="Описания"  onChange={handleDescriptionTodo}></Description>
                    Новый cрок выполнения
                    <DatePicker value = {props.todo.dateendpoint} selected={dataendpoint} required onChange={(date:any) => setDataendpoint(date)} />
                    <button type ="submit" onClick={changeTodo}>Изменить задачу </button> 
                </form>
            </ModalView>
        </div>
    )
}
