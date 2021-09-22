import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/landing">
          <h1>landing</h1>
        </Route>
        <Route exact path="/dashboard" >
        <h1>dashboard</h1>
        </Route>
        <Route path="/">
          <Link to="/landing">landing</Link>
          <Link to="/dashboard">dashboard</Link>
        </Route>
      </Switch>
    </div>
  </Router >
  );
}

export default App;
