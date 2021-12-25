interface Todostate{
    todolist: Array<Object>;
    currentPage : number
}
const defaultState : Todostate = {
    todolist : [],
    currentPage:1
}
const GET_TODOS = "GET_TODOS"
const GET_CURRENT_PAGE = "GET_CURRENT_PAGE"
const DELETE_EXIT = "DELETE_EXIT"
// const REMOVE_ONE_TODO = "REMOVE_ONE_TODO"
// const ADD_ONE_TODO = "ADD_ONE_TODO"
// const CHANGE_CURRENT_TODO = "CHANGE_CURRENT_TODO"
// const CHANGE_IS_COMPLETE = "CHANGE_IS_COMPLETE"
// 
export const todoReducer = (state = defaultState, action:any):any =>{
    switch(action.type){
        case GET_TODOS:
            return {...state, todolist: [...action.payload]}
        case GET_CURRENT_PAGE:
            return {...state,currentPage: action.payload}
        case DELETE_EXIT:
            return {...state, todolist: action.payload}
        // case REMOVE_ONE_TODO:
        //     return {...state, todolist: state.todolist.filter((todo:any) => todo.id !== action.payload.id)}
        // case ADD_ONE_TODO:
        //     return {...state, todolist: [...state.todolist, action.payload]}
        // case CHANGE_IS_COMPLETE:
        //     return {...state, todolist: state.todolist.map((todo:any) => {
        //         if(todo.id === action.payload.id){
        //             return {...todo, status:false}
        //         }
        //         return todo
        //     })} /// ? // setData

        //  case CHANGE_CURRENT_TODO:
        //     return {...state, todolist: state.todolist.map((item:any) => {
        //         if(item.id === action.payload.id){
        //             item.data 
        //         }
        //     }}
    default: 
      return state
    }
}
export const getTodoFromServer = (payload:any):any => ({type:GET_TODOS, payload})
export const setCurrentPage = (payload:any):any => ({type:GET_CURRENT_PAGE, payload})
export const deleteexit = (payload:any):any => ({type:DELETE_EXIT , payload})
// export const actionDeleteTodo = (payload:any):any => ({type:REMOVE_ONE_TODO, payload})
// export const actionAddOneTodo = (payload:any):any => ({type:ADD_ONE_TODO, payload})
// export const actionChangeCurrentTodo = (payload:any):any => ({type:CHANGE_CURRENT_TODO, payload})
// export const actionChangeIsComplete = (payload:any):any => ({type: CHANGE_IS_COMPLETE , payload})
// // export const actionChangeTodo = (payload:any):any => ()
// export const removeTodo = (payload:any):any => ({type:REMOVE_ONE_TODO, payload})
// export const addOneTodo = (payload:any):any => ({type: ADD_ONE_TODO, payload})