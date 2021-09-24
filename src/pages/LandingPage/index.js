import React, { useState } from 'react'
import { ROUTE_DASHBOARD } from 'utils/routes'
import 'pages/LandingPage/styling.css'
import palm from 'utils/assets/hand.svg'
import landingIll from 'utils/assets/landingIll.svg'
import { motion } from "framer-motion";
import { Snackbar, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux'
import authentication from 'utils/authentication'
import { useDispatch } from 'react-redux'
import { authActions } from 'utils/actionTypes'

const LandingPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user);
    const [closeEyes, setCloseEyes] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    const [username, setUsename] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [formType, setFormType] = useState('login')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [openSnack, setOpenSnack] = useState(false);


    const handelRegister = (e) => {
        e.preventDefault();
        setError('Right Now we dont allow new users to get into the system.');
        setOpenSnack(true);
    }

    const handelLogin = (e) => {
        e.preventDefault();
        setLoading(true)
        setError('')
        authentication({
            username,
            password,
        }).then(res => {
            if (res) {
                dispatch({
                    type: authActions.Login,
                    user: {
                        name: 'babblu',
                        username:username,
                        password: password,
                    }
                })
                setLoading(false)
                history.push(ROUTE_DASHBOARD)
            }
        }).catch(err => {
            console.log(err)
            setError('Invalid username or password');
            setOpenSnack(true);
            setLoading(false)
        })
    }

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    return (
        <div className='root'>
            <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
                <Alert className='snackbarDiv' severity="error">
                    <strong>{error}</strong>
                </Alert>
            </Snackbar>
            <div className="loginForm">
                <div className='rootDiv'>
                    <div className='screen'>
                        <form id="login-form" className="login-form" autoComplete="off" role="main">
                            <div className='selectTypeMenu'>
                                <label className="label-username">
                                    <TextField label="USERNAME" className="text" value={username} onChange={(e) => setUsename(e.target.value)} />
                                </label>
                                {
                                    formType === 'login' ? (
                                        null
                                    ) : (
                                        <label className="label-username">
                                            <TextField label="NAME" className="text" value={name} onChange={(e) => setName(e.target.value)} />
                                        </label>
                                    )
                                }
                            </div>
                            <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" />
                            <label className="label-show-password" htmlFor="show-password">
                                <span onClick={() => {
                                    seePassword ? (setSeePassword(false)) : (setSeePassword(true))
                                }}>Show Password</span>
                            </label>
                            <div>
                                <label className="label-password">
                                    <TextField type={seePassword ? ("text") : ("password")} label="PASSWORD" className="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" onBlur={() => setCloseEyes(false)} onFocus={() => setCloseEyes(true)} />
                                </label>
                            </div>
                            {
                                formType === 'login' ? (
                                    <button type='submit' disabled={loading || user} onClick={handelLogin} >Log In</button>

                                ) : (
                                    <button type='submit' disabled={loading || user} onClick={handelRegister}>Register</button>
                                )
                            }
                            <figure aria-hidden="true">
                                <div className="person-body"></div>
                                {
                                    closeEyes ? (
                                        <>
                                            <motion.div className="left-hand" animate={{ rotate: 25 }}><img src={palm} alt='palm' /></motion.div>
                                            <motion.div className="right-hand" animate={{ rotate: -25 }}><img src={palm} alt='palm' /></motion.div>
                                        </>
                                    ) : (null)
                                }
                                <div className="neck skin"></div>
                                <div className={seePassword ? ("head skin see") : ("head skin")}>
                                    <div className="eyes">
                                        <div className="pupil"></div>
                                    </div>
                                    <div className="mouth"></div>
                                </div>
                                <div className="hair"></div>
                                <div className="ears"></div>
                                <div className="shirt-1"></div>
                                <div className="shirt-2"></div>
                            </figure>
                        </form>
                        {
                            formType === 'login' ? (
                                <div>New to the System? Want to <span className='changeForm' onClick={() => { setFormType('signup') }}>Register</span></div>
                            ) : (
                                <div>Already Registered? Want to <span className='changeForm' onClick={() => { setFormType('login') }}>Login</span></div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='diaplayImage'>
                <img src={landingIll} alt='palm' style={{ height: '100vh', width: '50vw' }} />
            </div>
        </div>
    )
}

export default LandingPage
