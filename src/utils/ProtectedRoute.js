import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE_LANDING_PAGE } from './routes';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = useSelector((state) => state.user);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (user) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTE_LANDING_PAGE,
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
