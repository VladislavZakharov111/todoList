import React from "react";
import { Route, Switch } from "react-router-dom";
import { Authorization } from "./pages/AuthPage";
import { MainPage } from "./pages/MainPage/index";
import { DefferedPage } from "./pages/ArchivePage/index";
import { Profile } from "./pages/ProfilePage/index";
import { ConnectedRouter } from "connected-react-router";
import { Registration } from "./pages/RegistrationPage/index";
import { ForgotPassword } from "./pages/ForgotPassword/index";
import { DetailPage } from "./pages/DetailsPage/index";
import "./App.css";
const App = ({ history, context }: any) => {
  return (
    <div className="App">
      <ConnectedRouter history={history} context={context}>
        <Switch>
          <Route exact path="/auth" component={Authorization} />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/archive" component={DefferedPage} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route path="/:id" component={DetailPage} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
};
export default App;
