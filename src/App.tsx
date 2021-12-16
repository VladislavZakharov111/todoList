import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authorization from './components/authPage/index';
import {MainPage} from "./components/mainPage/index";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/login" component={Authorization}/>
        <Route exact path = "/" component={MainPage}/> 
      </Switch>
    </div>
  );
}

export default App;
