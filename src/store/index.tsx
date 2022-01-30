import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { authReducer } from "../store/auth/reducer";
import { todoReducer } from "../store/todo/reducer";
import { registerReducer } from "../store/registeration/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { defferedReducer } from "../store/deffered/reducer";
import { connectRouter } from "connected-react-router";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { forgotPassworddReducer } from "../store/forgotPassword/reducer";
export const history = createBrowserHistory();

export const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    authReducer,
    todoReducer,
    defferedReducer,
    registerReducer,
    forgotPassworddReducer,
  });

export type RootState = ReturnType<typeof createRootReducer>;

export default function configureStore(preloadedState: any) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  );
  return store;
}
