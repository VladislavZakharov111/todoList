import React , {useState} from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetDataTodos } from "../../services/GetData";
import { todoReducer } from "../../store/todoReducer";
import { useTypedSelector } from '../../hooks/useTypedSelector'; 
import {ModalView} from '../mainPage/components/modalView/index';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {addOneTodo} from "../../store/todoReducer";
import {Description} from "./styled"
import axios from "axios"
export const MainPage = () =>{
    const [modalActiveAdd, setmodalActiveAdd] = useState<any>(false);
    const [modalActiveChange, setmodalActiveChange] = useState<any>(false);
    const [startDate, setStartDate] = useState(new Date());
    const [categories, setCategories] = useState<any>("спорт")
    const [title, setTitle] = useState("")
    const [decription, setDescription] = useState<any>("")
    const [currentId, setCurrentId] = useState<number>()
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
    // let data = {id: todoInfo.length + 1, "date-create":nowdata, "data-change":nowdata, categories:categories, title:title, description:decription}
    // let data = { "date-create":nowdata, "data-change":nowdata, categories:categories, title:title, description:decription}
    
    const handleSubmitPopUp = (e: React.ChangeEvent<HTMLFormElement>) =>{
      e.preventDefault()
      // dispatch(addOneTodo(data))
      axios.post(`http://localhost:3000/todos`, {
        "date-create":nowdata,
        "data-change":nowdata,
        categories:categories,
        title:title,
        description:decription,
      }).then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
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

    const deleteTodo = (todoId: any):any =>{
      axios.delete(`http://localhost:3000/todos/${todoId}`)
     .then(resp => resp.data).catch(error => console.log(error))
    }

    // const change = (id: number) => {
    //   console.log(id);
    // };

    const changeTodo = (todoId: any):any => {
      console.log("todoId",todoId)
      console.log("param", title, categories, decription)
        axios.put(`http://localhost:3000/todos/${todoId}`,{
              "date-create":nowdata,
              "data-change":nowdata,
              categories:categories,
              title:title,
              description:decription,
        })
        setmodalActiveChange(false)
    }
    const changeCurrentId = (todoId:number):any =>{
      setCurrentId(todoId)
    }
    const activeModalChangeMethod = (todoId:number):any => {
      changeCurrentId(todoId)
      setmodalActiveChange(true)
    }
    // console.log("date", convertDate(startDate))
    // // console.log("date type", typeof startDate)
    // console.log("param", title, categories, decription)
    return(<div>
       <button onClick={() => setmodalActiveAdd(true)}>Добавить новую задачу</button>
       <table> 
       {todoInfo.length ? Object.keys(todoInfo[0]).map((item:any)=>(<th>{item}</th>)) : <div>Loading...</div>}
       {todoInfo.map((item:any,index:any) => (
        <tr key={`item.title${index}`}>
          {Object.values(item).map((val:any) => (
            <td>{val}</td>
          ))}
          <td>
            <button onClick = {() => deleteTodo(item.id)}>Удалить</button>
            <button onClick = {() => activeModalChangeMethod(item.id)}>Изменить</button>
            {/* <button onClick = {activeModalChangeMethod(item.id)}>Изменить</button> */}
            <button>Отложить</button>
          </td>
        </tr>
        ))}
      </table>
      <ModalView active={modalActiveAdd} setActive={setmodalActiveAdd}>
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
          <button type ="submit" onClick={()=>setmodalActiveAdd(false)}>Создать задачу </button> 
        </form>
       </ModalView>

       <ModalView active={modalActiveChange} setActive={setmodalActiveChange}>
        <form onSubmit={handleSubmitChange}>
          Категории
          <select onChange={handleCategories} required >
            <option>Спорт</option>
            <option>Музыка</option>
            <option>Кино</option>
            <option>Магазин</option>
          </select>
          Новый заголовок
          <input type = "text" placeholder="Заголовок" required onChange={handleTitleTodo}></input>
          Новое описание
          <Description placeholder="Описания"  onChange={handleDescriptionTodo}></Description>
          Новый cрок выполнения
          <DatePicker selected={startDate} required onChange={(date:any) => setStartDate(date)} />
          <button type ="submit" onClick={()=> changeTodo(currentId)}>Изменить задачу </button> 
        </form>
      </ModalView>
    </div>)
}