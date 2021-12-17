import React , {useState} from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetDataTodos } from "../../services/GetData";
import { todoReducer } from "../../store/todoReducer";
import { useTypedSelector } from '../../hooks/useTypedSelector'; 
import {ModalView} from '../mainPage/components/modalView/index';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {addOneTodo} from "../../store/todoReducer";
import {Description} from "./styled"

export const MainPage = () =>{
    const [modalActive, setModalActive] = useState<any>(false);
    const [startDate, setStartDate] = useState(new Date());
    const [categories, setCategories] = useState<any>("спорт")
    const [title, setTitle] = useState("")
    const [decription, setDescription] = useState<any>("")
    const dispatch = useDispatch()
    const todoInfo = useTypedSelector(state => state.todoReducer.todolist)
    useEffect(() => {
        dispatch(GetDataTodos())
    }, [])

    useEffect(()=>{
        console.log("ff", todoInfo)
    },[todoInfo])

    // const convertDate = (inputFormat : any) =>{
    //   function pad(s :any):any {return (s < 10) ? '0' + s : s}
    //   let d = new Date(inputFormat)
    //   return [d.getFullYear(), pad(d.getMonth()+1),  pad(d.getDate())].join('-')
    // }

    let nowdata = new Date().toISOString().slice(0, 10);
    let data = {id: todoInfo.length + 1, "date-create":nowdata, "data-change":nowdata, categories:categories, title:title, description:decription}
    const handleSubmitPopUp = (e: React.ChangeEvent<HTMLFormElement>) =>{
      e.preventDefault()
      dispatch(addOneTodo(data))
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
    // console.log("date", convertDate(startDate))
    // // console.log("date type", typeof startDate)
    // console.log("param", title, categories, decription)
    return(<div>
       <button onClick={() => setModalActive(true)}>Добавить новую задачу</button>
       <table> 
       {todoInfo.length ? Object.keys(todoInfo[0]).map((item:any)=>(<th>{item}</th>)) : <div>Loading...</div>}
       {todoInfo.map((item:any,index:any) => (
        <tr key={`item.title${index}`}>
          {Object.values(item).map((val:any) => (
            <td>{val}</td>
          ))}
          <td>
            <button>Удалить</button>
            <button>Изменить</button>
            <button>Отложить</button>
          </td>
        </tr>
        ))}
      </table>
      <ModalView active={modalActive} setActive={setModalActive}>
        <form onSubmit = {handleSubmitPopUp}>
          Категории
          <select onChange={handleCategories} required >
            <option>Спорт</option>
            <option>Музыка</option>
            <option>Кино</option>
            <option>Магазин</option>
          </select>
          Заголовок
          <input type = "text" placeholder="Заголовок" required onChange={handleTitleTodo}></input>
          Описание оо
          <Description placeholder="Описания"  onChange={handleDescriptionTodo}></Description>
          Крайний срок
          <DatePicker selected={startDate} required onChange={(date:any) => setStartDate(date)} />
          <button type ="submit">Создать задачу </button> 
        </form>
       </ModalView>
    </div>)
}