const defaultState = {
    todolist : [],
}
const ADD_TODO = "ADD_TODO"
const ADD_ONE_TODO = "ADD_ONE_TODO"
export const todoReducer =  (state = defaultState, action:any):any =>{
    switch(action.type){
        case ADD_TODO:
            return {...state, todolist: [...state.todolist, ...action.payload]}
        case ADD_ONE_TODO:
            return {...state, todolist: [...state.todolist, action.payload]}
    default: 
      return state
    }
}
export const addNewTodo = (payload:any):any => ({type:ADD_TODO, payload})

export const addOneTodo = (payload:any):any => ({type: ADD_ONE_TODO, payload})