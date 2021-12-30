import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authorization from './components/authPage/index';
import {MainPage} from "./components/mainPage/index";
import {DefferedPage} from "./components/defferedPage/index"
import {Profile} from "./components/profilePage/index"
import { ConnectedRouter } from 'connected-react-router'
import { Registration } from "../src/components/registration/index";
import { ForgotPassword } from "./components/fogotPassword/index" ;
import DetailPage from "./components/detailedPage/index";
function App({ history, context }:any) {
  return (
    <div className="App">
    <ConnectedRouter history={history} context={context}>
      <Switch>
         <Route exact path = "/auth" component={Authorization}/>
         <Route exact path = "/" component={MainPage}/> 
          <Route exact path = "/archive" component={DefferedPage}/>
         <Route exact path = "/profile" component = {Profile}/>
          <Route exact path= "/register" component={Registration}/>
          <Route exact path= "/forgot-password" component ={ForgotPassword}/>
          <Route path = "/:id" component={DetailPage}/>
       </Switch>
    </ConnectedRouter>
    </div>
  );
}
export default App;
