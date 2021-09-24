import React from 'react'
import './styling.css'
import logo from 'utils/assets/logo.svg'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { ROUTE_DASHBOARD, ROUTE_LANDING_PAGE } from 'utils/routes'
import { authActions } from 'utils/actionTypes'


const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const user = useSelector(state => state.user);
    const goToDashboard = ()=> history.push(ROUTE_DASHBOARD);
    const handleLogout = ()=> {
        dispatch({
            type: authActions.Logout,
        })
    }
    return (
        <div className='navBar'>
            <img className='logo' src={logo} alt={`Logo`}/>
            <div className='navBarAction'>
                {
                    user?(
                        location.pathname===ROUTE_LANDING_PAGE?(
                            <Button color="secondary" size="large" variant="contained" onClick={goToDashboard}>Go To Dashboard</Button>
                        ):(
                            <Button color="secondary" size="large" variant="contained" onClick={handleLogout}>Logout</Button>
                        )
                    ):(
                        <div></div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
