import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authorization from './components/authPage/index';
import {MainPage} from "./components/mainPage/index";
import {DefferedPage} from "./components/defferedPage/index"
import {Profile} from "./components/profilePage/index"
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/auth" component={Authorization}/>
        <Route exact path = "/" component={MainPage}/> 
        <Route exact path = "/archive" component={DefferedPage}/>
        <Route exact path = "/profile" component = {Profile}/>
      </Switch>
    </div>
  );
}
export default App;
