import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, ReactReduxContext } from 'react-redux'
import configureStore ,  { history }  from "../src/store/index";
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Global } from "../src/GlobalStyled"
import { ConnectedRouter } from 'connected-react-router'

const store = configureStore("/auth")

ReactDOM.render(
      <Provider store={store} context={ReactReduxContext}>
        <App history={history} context={ReactReduxContext} />
        <Global/>
      </Provider>, 
  
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
