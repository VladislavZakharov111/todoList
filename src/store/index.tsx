import { applyMiddleware, combineReducers, createStore } from 'redux'
import {authReducer} from "../store/authReducer"
import {todoReducer} from "../store/todoReducer"
import { composeWithDevTools } from 'redux-devtools-extension';
import {defferedReducer} from "../store/defferedReducer"
import thunk from 'redux-thunk'
const rootReducer = combineReducers({
    authReducer,
    todoReducer,
    defferedReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk))) 