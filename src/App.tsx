import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authorization from './components/authPage/index';
import {MainPage} from "./components/mainPage/index";
import {DefferedPage} from "./components/defferedPage/index"
import {Profile} from "./components/profilePage/index"
import { ConnectedRouter } from 'connected-react-router'
// function App({ history, context } : {history:any , context:any}) {
function App() {
  return (
    <div className="App">
    {/* <ConnectedRouter history={history} context={context}> */}
      <Switch>
         <Route exact path = "/auth" component={Authorization}/>
         <Route exact path = "/" component={MainPage}/> 
       <  Route exact path = "/archive" component={DefferedPage}/>
         <Route exact path = "/profile" component = {Profile}/>
       </Switch>
    {/* </ConnectedRouter> */}
    </div>
  );
}
export default App;
