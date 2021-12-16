import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetDataTodos } from "../../services/GetData";
import { todoReducer } from "../../store/todoReducer";
import { useTypedSelector } from '../../hooks/useTypedSelector'; 
export const MainPage = () =>{

    const dispatch = useDispatch()
    const todoInfo = useTypedSelector(state => state.todoReducer.todolist)
    
    useEffect(() => {
        dispatch(GetDataTodos())
    }, [])

    useEffect(()=>{
        console.log("ff", todoInfo)
    },[todoInfo])
    
    if(todoInfo.length){

    }

    // console.log(todoInfo && Object.values(todoInfo[0]))
    return(<div>
        {/* <table >
            <tr>
                <th>Дата создания</th>
                <th>Дата изменения</th>
                <th>Категории</th>
                <th>Заголовок</th>
                <th>Описание</th>
            </tr>
            <tr>
                <td>Значение</td>
                <td>Значение</td>
                <td>Значение</td>
                <td>Значение</td>
                <td>Значение</td>
                <td>Значение</td>    
            </tr>
        </table> */}
        
       {/* <table border="2"> */}
       <button>Добавить новую задачу</button>
       <table>
       {todoInfo.length ? Object.keys(todoInfo[0]).map((item:any)=>(<th>{item}</th>)) : <div>Loading...</div>}
       {todoInfo.map((item:any) => (
        <tr key={item.title}>
          {Object.values(item).map((val:any) => (
            <td>{val}</td>
          ))}
        </tr>
        ))}
    </table>
    </div>)
}