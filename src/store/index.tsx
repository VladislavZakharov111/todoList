import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import {authReducer} from "../store/authReducer"
import {todoReducer} from "../store/todoReducer"
import { composeWithDevTools } from 'redux-devtools-extension';
import {defferedReducer} from "../store/defferedReducer"
import { connectRouter } from 'connected-react-router'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export const createRootReducer = (history:any) => combineReducers({
    router: connectRouter(history),
        authReducer,
        todoReducer,
        defferedReducer,
  })

export type RootState = ReturnType<typeof createRootReducer>

export default function configureStore(preloadedState: any) {
    const store = createStore(
      createRootReducer(history), 
      preloadedState,
      composeWithDevTools(
        applyMiddleware(
          routerMiddleware(history), thunk 
        ),  
      ),
    )
    return store
}

