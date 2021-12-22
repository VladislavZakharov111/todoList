import React , {useState} from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {  setDataTodo, deleteTodo ,addNewTodo , changeCurrentTodo, setIsComplited , addArchiveTodo,deleteCheckedTodo } from "../../services/GetData";
import { useTypedSelector } from '../../hooks/useTypedSelector'; 
import {ModalView} from '../mainPage/components/modalView/index';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Description} from "./styled"
import { Exit } from "./components/exit";

enum CategoriesTodo {
  Sport = 'Спорт',  
  Music = 'Музыка',
  Movie = 'Кино',
  Shop = 'Магазин',
}
const arrayCategories = [CategoriesTodo.Sport , CategoriesTodo.Music, CategoriesTodo.Movie, CategoriesTodo.Shop] // 

export const MainPage = () =>{
    const [modalActiveAdd, setmodalActiveAdd] = useState<any>(false);
    const [modalActiveChange, setmodalActiveChange] = useState<any>(false);
    const [dataendpoint, setDataendpoint] = useState(new Date()); 
    const [categories, setCategories] = useState<any>("Cпорт")
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
    const [modalctiveDelete, setModalActiveDelete] = useState<any>(false)
    const dispatch = useDispatch()
    const todoInfo = useTypedSelector(state => state.todoReducer.todolist)
    // const checkDeleteTodo = useState<Array<number>>([])


    useEffect(() => {
        dispatch(setDataTodo())
    }, [])

    useEffect(()=>{
        console.log("ff", todoInfo)
        console.log(CategoriesTodo.Movie);
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
      dispatch(addNewTodo(todoInfo.length, nowdata, categories, title , decription))
    } //////////////////////////добавление

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

    // const deleteTodos = (todoId: any):any =>{
    // //   axios.delete(`http://localhost:3000/todos/${todoId}`)
    // //  .then(resp => resp.data).catch(error => console.log(error))
    //   dispatch(deleteTodo(todoId)) // dispath delete
    // }

    // const change = (id: number) => {
    //   console.log(id);
    // };

    const changeTodo = (todoId: any):any => {
      dispatch(changeCurrentTodo(todoId ,nowdata, categories ,title,decription ))
      // console.log("todoId",todoId)
      // console.log("param", title, categories, decription)
        setmodalActiveChange(false)
    }
    const changeCurrentId = (item:any):any =>{
      setCurrentTodo(item)
    }
    const activeModalChangeMethod = (item:any):any => {
      changeCurrentId(item)
      setmodalActiveChange(true)
    }
    
    const addDefferedTodo = (todo: Object) => {
      // axios.post(`http://localhost:3000/deffered`, {todo});
      // dispatch(getArchiveTodo(todo))
      dispatch(addArchiveTodo(todo))
    } //thunk
    
    const deleteManyTodos = () => {
      // axios.delete("http://localhost:3000/todos?id=1") 
      //checkedTodos
      dispatch(deleteCheckedTodo(checkedTodos))
    }

    const saveCheckId  = (event:any, id:any ) => {
      console.log({event,id});
      event.target.checked ? setCheckedTodos([...checkedTodos,id]) : setCheckedTodos(checkedTodos.filter((todoId:any) => id !== todoId))
    }

    const handeDelete = (id:any):any =>{
      dispatch(deleteTodo(id))
    }

    const handleCompleted = (id:any, isCompleted: any):any => {
      // setIsCompletedStatus(!isCompletedStatus);
      dispatch(setIsComplited(id,isCompleted))
    }////?
    

    return(<div>
       <button onClick={() => setmodalActiveAdd(true)}>Добавить новую задачу</button>
       <button onClick={deleteManyTodos}>Удалить выбранные задачи</button>
       <Exit/>
      
       {/* {todoInfo.length ? Object.keys(todoInfo[0]).map((item:any)=>(<th>{item}</th>)) : <div>Loading...</div>} */}
       {/* {todoInfo.map((item:any,index:any) => {
        return (
          <tr key={`item.title${index}`}>
          {Object.values(item).map((val:any) => (
            <td>{val}</td>
          ))}
          <td>
            <button onClick={() => handleCompleted(item.id)}>Выполнено</button>
            <button onClick = {() => handeDelete(item.id)}>Удалить</button> 
            <button onClick = {() => activeModalChangeMethod(item)}>Изменить</button>
            <button onClick={() => addDefferedTodo(item)}>Отложить</button>
          </td>
          <td><input type ="checkbox" onChange={(event) => saveCheckId(event,item.id)}/>Выбрать для удаления</td>
        </tr>)
        })} */}
        <table> 
          {
            todoInfo.map((todo:any) => {
              return(
                <tr key = {todo.title}>
                  <td>{todo.datecreate}</td>
                  <td>{todo.datachange}</td>
                  <td>{todo.categories}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>
                    <button onClick={() => handleCompleted(todo.id, todo.status)}>Выполнено</button>
                    <button onClick = {() => handeDelete(todo.id)}>Удалить</button> 
                    <button onClick = {() => activeModalChangeMethod(todo)}>Изменить</button>
                    <button onClick={() => addDefferedTodo(todo)}>Отложить</button>
                    <input type ="checkbox" onChange={(event) => saveCheckId(event,todo.id)}/>
                  </td>
                </tr>
              )
            })
          }
      </table> 

      <ModalView active={modalActiveAdd} setActive={setmodalActiveAdd}>
        <button onClick={()=>setmodalActiveAdd(false)}>Закрыть</button>
        <form onSubmit = {handleSubmitPopUp}>
          Категории
          <select onChange={handleCategories} required >
            {arrayCategories.map((categories:any) =>  <option>{categories}</option>)}
          </select>
          Заголовок
          <input type = "text" placeholder="Заголовок" required onChange={handleTitleTodo}></input>
          Описание оо
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
        <form>
          <button>Закрыть</button>
          <div>Вы действительно хотите удалить задачу?</div>
          <button>Да</button>
          <button>Нет</button>
        </form>
      </ModalView>

      <ModalView active={modalctiveDelete} setActive={setModalActiveDelete}>
        <form>
          <button>Закрыть</button>
          <div>Вы действительно хотите удалить задачу?</div>
          <button>Да</button>
          <button>Нет</button>
        </form>
      </ModalView>
    </div>)
}