// import axios from "axios"
// import {addNewDataUser} from "../store/authReducer"

// export const GetDataUsers = async(
//     login:string
// ):Promise<Array<Object>> =>{
//     const res = await  axios.get(`http://localhost:3005/users?login=${login}`);
//     console.log(res);
//     return res.data;
// }


// export const GetDataUsers = async(
//     login:string
// ):function => {
//     return function(dispath) =>{
//         axios.get(`http://localhost:3005/users?login=${login}`)
//         .then(res => dispatch())
//     }
// }   
export const data = 10