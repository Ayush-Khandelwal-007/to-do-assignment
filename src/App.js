import LandingPage from 'pages/LandingPage';
import Dashboard from 'pages/Dashboard/index.js';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { authActions } from 'utils/actionTypes';
import ProtectedRoute from 'utils/ProtectedRoute';
import Navbar from 'components/Navbar';
import { ROUTE_DASHBOARD, ROUTE_LANDING_PAGE } from 'utils/routes';
import { local_storage_get } from 'utils/localStorage';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const savedUser = local_storage_get('user');
        if (savedUser) {
            dispatch({ type: authActions.Login, user: savedUser });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route exact path={ROUTE_LANDING_PAGE}>
                        <LandingPage />
                    </Route>
                    <ProtectedRoute exact path={ROUTE_DASHBOARD} component={Dashboard} />
                    <Route path="*">
                        <Redirect to={ROUTE_DASHBOARD} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
