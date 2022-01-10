interface Todostate{
    todolist: Array<Object>;
    currentPage : number;
    categories: string | null;
    title: string | null;
    doneTask : string | boolean | null;
    sort: boolean;
    detailPage : Array<Object> | null;
}
const defaultState : Todostate = {
    todolist : [],
    currentPage:1,
    categories: null,
    title: null,
    doneTask: null,
    sort: false,
    detailPage: [],
}
const GET_TODOS = "GET_TODOS"
const GET_CURRENT_PAGE = "GET_CURRENT_PAGE"
const DELETE_EXIT = "DELETE_EXIT"
const GET_CATEGORIES = "GET_CATEGORIES"
const GET_TITLE = "GET_TITLE"
const GET_DONE_TASK =  "GET_DONE_TASK"
const GET_VALUE_SORT = "GET_VALUE_SORT"
const GET_DETAIL_PAIGE = "GET_DETAIL_PAIGE"
export const todoReducer = (state = defaultState, action:any):any =>{
    switch(action.type){
        case GET_TODOS:
            return {...state, todolist: [...action.payload]}
        case GET_CURRENT_PAGE:
            return {...state,currentPage: action.payload}
        case DELETE_EXIT:
            return {...state, todolist: action.payload}
        case GET_CATEGORIES:
            return {...state, categories: action.payload}
        case GET_TITLE:
            return {...state, title: action.payload}
        case GET_DONE_TASK:
            return {...state, doneTask: action.payload}
        case GET_VALUE_SORT:
            return {...state, sort: action.payload}
        case GET_DETAIL_PAIGE:
            return {...state, detailPage: [action.payload] }
        
    default:
      return state
    }
}
export const getTodoFromServer = (payload:any):any => ({type:GET_TODOS, payload})
export const setCurrentPage = (payload:any):any => ({type:GET_CURRENT_PAGE, payload})
export const deleteexit = (payload:any):any => ({type:DELETE_EXIT , payload})

export const actionSetCategories = (payload:any):any => ({type:GET_CATEGORIES, payload})
export const actionSetTitle = (payload:any):any => ({type:GET_TITLE, payload})
export const actionSetDoneTask = (payload:any):any => ({type:GET_DONE_TASK, payload})
export const actionSetValueSort = (payload:any):any => ({type:GET_VALUE_SORT, payload})

export const actionSetDetailPage = (payload:any):any => ({type:GET_DETAIL_PAIGE, payload})
 