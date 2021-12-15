import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authorization from './components/authPage/index';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/login" component={Authorization}/>
      </Switch>
    </div>
  );
}

export default App;
