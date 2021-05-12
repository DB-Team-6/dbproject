import React from "react";
import { Button, Toolbar, Typography, AppBar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Logout } from './api';
import { getCookie } from './utils'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Navbar({ handleLogin }) {
    const history = useHistory();
    const loggedin = getCookie("auth")
    const logOut = async () => {
        const response = await Logout();
        const result = response?.logoutSuccess;
        try {
            if (result === true) {
                document.cookie = `auth=false`
                handleLogin()
                history.push('/login');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AppBar style={{background: '#162748'}} position="sticky">
            <Toolbar>
                <Typography style={{ flexGrow: 1 }} variant="h5" component="h1" gutterBottom>
                    Inventory Monitor
                </Typography>
                {loggedin === 'true'
                    ? <Button variant="contained" style={{background: '#E88547'}} onClick={logOut}>Logout</Button>
                    : (window.location.href).includes("login")
                        ? null
                        : <Button component={Link} to="/login" style={{background: '#E88547'}}>Login</Button>
                }
            </Toolbar>
        </AppBar>
    )
}