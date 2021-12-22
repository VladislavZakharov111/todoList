interface UserState{
    defferedTodo : Array<Object> ;
  }
  interface UserAction{
    type:string;
    payload?: any;
  }
  const defferedState: UserState = {
        defferedTodo : [],
  }
  const ADD_DEFFERED_FROM_SERVER = "ADD_DEFFERED_FROM_SERVER"
export const defferedReducer = (state = defferedState,action:UserAction) =>{
      switch(action.type){
        case  ADD_DEFFERED_FROM_SERVER:
            return {...state, defferedTodo: [...action.payload]}
        default : 
        return state
      }
  }
  
export const addDefferedFromServer = (payload:any):any => ({type: ADD_DEFFERED_FROM_SERVER, payload})