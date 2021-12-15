const defState = {
    user : {
      login: " ",
      password: " ",
    } 
}

export const authReducer = (state = defState ,action:any) =>{
    switch(action.type){
      case  "ADD_USER":
        return {...state, user: action.payload}
      default : 
      return state
    }
}

export const addNewDataUser = (payload:any) => ({
  type: "ADD_USER_SERVER",
  payload
})