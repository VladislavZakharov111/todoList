interface Todostate{
    todolist: Array<Object> 
    
}
const defaultState : Todostate = {
    todolist : [],
}
const ADD_TODO = "ADD_TODO"
const REMOVE_ONE_TODO = "REMOVE_ONE_TODO"
const ADD_ONE_TODO = "ADD_ONE_TODO"
const CHANGE_CURRENT_TODO = "CHANGE_CURRENT_TODO"
const CHANGE_IS_COMPLETE = "CHANGE_IS_COMPLETE"
// 
export const todoReducer =  (state = defaultState, action:any):any =>{
    switch(action.type){
        case ADD_TODO:
            return {...state, todolist: [...state.todolist, ...action.payload]}
        case REMOVE_ONE_TODO:
            return {...state, todolist: state.todolist.filter((todo:any) => todo.id !== action.payload.id)}
        case ADD_ONE_TODO:
            return {...state, todolist: [...state.todolist, action.payload]}
        case CHANGE_IS_COMPLETE:
            return {...state, todolist: state.todolist.map((todo:any) => {
                if(todo.id === action.payload.id){
                    return {...todo, status:false}
                }
                return todo
            })}

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
export const addNewTodo = (payload:any):any => ({type:ADD_TODO, payload})
export const actionDeleteTodo = (payload:any):any => ({type:REMOVE_ONE_TODO, payload})
export const actionAddOneTodo = (payload:any):any => ({type:ADD_ONE_TODO, payload})
export const actionChangeCurrentTodo = (payload:any):any => ({type:CHANGE_CURRENT_TODO, payload})
export const actionChangeIsComplete = (payload:any):any => ({type: CHANGE_IS_COMPLETE , payload})
// export const actionChangeTodo = (payload:any):any => ()
// export const removeTodo = (payload:any):any => ({type:REMOVE_ONE_TODO, payload})
// export const addOneTodo = (payload:any):any => ({type: ADD_ONE_TODO, payload})