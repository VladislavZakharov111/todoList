interface UserState{
  user : Array<Object> | null;
}
interface UserAction{
  type:string;
  payload?: any;
}
const defState: UserState = {
    user : [],
}
const ADD_USER = "ADD_USER"
export const authReducer = (state = defState,action:UserAction) =>{
    switch(action.type){
      case  ADD_USER:
        return {...state, user: action.payload}
      default : 
      return state
    }
}

export const addUserFromServer = (payload:any):any => ({type: ADD_USER, payload})