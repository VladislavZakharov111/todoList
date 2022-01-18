import React , {useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { addNewTodo } from '../../../../services/GetData'
import { ModalView } from '../modalView/index'
import DatePicker from "react-datepicker";
import { Description } from "../../../mainPage/styled"
import { format } from "date-fns"
import { arrayCategories } from "../../constants"

export const  AddTodo = () => {

    let nowdata = format(new Date(), "dd.MM.yyyy")
    const [modalActiveAdd, setmodalActiveAdd] = useState<any>(false);
    const [dataendpoint, setDataendpoint] = useState(new Date()); 
    const [categories, setCategories] = useState<any>('')
    const [title, setTitle] = useState('')
    const [decription, setDescription] = useState<any>('')
    const dispatch = useDispatch()

    const handleSubmitPopUp = (e: React.ChangeEvent<HTMLFormElement>) => {
        dispatch(addNewTodo(nowdata, categories, title , decription, format(dataendpoint, "dd.MM.yyyy")))
        setmodalActiveAdd(false)
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
            <button onClick={() => setmodalActiveAdd(true)}>Добавить новую задачу</button>
            <ModalView active={modalActiveAdd} setActive={setmodalActiveAdd}>
                <button onClick={()=>setmodalActiveAdd(false)}>Закрыть</button>
                <form onSubmit = {handleSubmitPopUp}>
                <p>Категории</p>
                <select onChange={handleCategories} required >
                    {arrayCategories.map((categories:any) =>  <option>{categories}</option>)}
                </select>
                <p>Заголовок</p>
                <input type = "text" placeholder="Заголовок" required onChange={handleTitleTodo}></input>
                <p>Описание</p>
                <Description placeholder="Описания" required onChange={handleDescriptionTodo}></Description>
                <p>Крайний срок</p>
                <DatePicker selected={dataendpoint} required onChange={(date:any) => setDataendpoint(date)} />
                <button type ="submit" >Создать задачу </button> 
                </form>
            </ModalView>
        </div>
    )
}
