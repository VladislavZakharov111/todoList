
import React , {useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteTodo } from '../../../../services/GetData'
import { ModalView } from '../modalView/index'

interface DeleteTodoProps{
    id:any;
}

export const DeleteTodo = (props: DeleteTodoProps) => {
    const [modalctiveDelete, setModalActiveDelete] = useState<any>(false)
    const dispatch = useDispatch()

    const handleModalDelete = () =>{
        dispatch(deleteTodo(props.id))
        setModalActiveDelete(false)
    }

    return (
        <div>
            <button onClick = {() => setModalActiveDelete(true)}>Удалить</button>
            <ModalView active={modalctiveDelete} setActive={setModalActiveDelete}>
                <button onClick={() => setModalActiveDelete(false)}>Закрыть</button>
                <div>Вы действительно хотите удалить задачу?</div>
                <button onClick={handleModalDelete}>Да</button>
                <button onClick={() => setModalActiveDelete(false)}>Нет</button>
            </ModalView>
        </div>
    )
}

