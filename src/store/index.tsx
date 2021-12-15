import { applyMiddleware, combineReducers, createStore } from 'redux'
import {authReducer} from "../store/authReducer"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
const rootReducer = combineReducers({
    authReducer
})

export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk))) 