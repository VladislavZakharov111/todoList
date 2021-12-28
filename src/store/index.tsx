import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import {authReducer} from "../store/authReducer"
import {todoReducer} from "../store/todoReducer"
import { composeWithDevTools } from 'redux-devtools-extension';
import {defferedReducer} from "../store/defferedReducer"
import { connectRouter } from 'connected-react-router'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

// export const createRootReducer = (history:any) => combineReducers({
export const RootReducer =  combineReducers({
    authReducer,
    todoReducer,
    defferedReducer,
})

export type RootState = ReturnType<typeof RootReducer>
 export const store = createStore(RootReducer,composeWithDevTools(applyMiddleware(thunk))) 
// export const history = createBrowserHistory()

// export default function configureStore(preloadedState: any) {
//     const store = createStore(
//       createRootReducer(history), // root reducer with router state
//       preloadedState,
//       compose(
//         applyMiddleware(
//           routerMiddleware(history), thunk // for dispatching history actions
//           // ... other middlewares ...
//         ),
//       ),
//     )
//     return store
// }