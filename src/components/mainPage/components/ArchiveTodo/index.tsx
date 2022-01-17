import React , {useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { addArchiveTodo, deleteTodo } from '../../../../services/GetData'
import { ModalView } from '../modalView/index'

interface ArchiveTodoProps{
    todo:any;
}

export const ArchiveTodo = (props: ArchiveTodoProps) => {
    
    const dispatch = useDispatch()
    const [activeModalArchive, setActiveModalArchive] = useState<any> (false)

    const addDefferedTodo = () => {
        dispatch(addArchiveTodo(props.todo))
        dispatch(deleteTodo(props.todo.id))
    } 

    return (
        <div>
            <button onClick={() => setActiveModalArchive(true)}>Добавить в архив</button>
            <ModalView active={activeModalArchive} setActive={setActiveModalArchive}>
                <button onClick={() => setActiveModalArchive(false)}>Закрыть</button>
                <div>Вы действительно добавить задачу в архив?</div>
                <button onClick={addDefferedTodo}>Да</button>
                <button onClick={() => setActiveModalArchive(false)}>Нет</button>
            </ModalView> 
        </div>
    )
}


