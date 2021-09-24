import LandingPage from 'pages/LandingPage';
import Dashboard from 'pages/Dashboard.js';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { authActions, todoActions } from 'utils/actionTypes';
import ProtectedRoute from 'utils/ProtectedRoute';
import Navbar from 'components/Navbar';
import { ROUTE_DASHBOARD, ROUTE_LANDING_PAGE } from 'utils/routes';

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch({ 
  //     type: todoActions.AddTodo, 
  //     id:'babblu',
  //     text:'babblu',
  //     completed:false,
  //   });
  // }, [])
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path={ROUTE_LANDING_PAGE}>
          <LandingPage />
        </Route>
        <ProtectedRoute exact path={ROUTE_DASHBOARD} component={Dashboard}/>
        <Route path='*'>
          <Redirect to={ROUTE_DASHBOARD} />
        </Route>
      </Switch>
    </div>
  </Router >
  );
}

export default App;
