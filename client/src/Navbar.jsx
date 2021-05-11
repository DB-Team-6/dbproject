import React, { useState, useEffect } from "react";
import { Button, Toolbar, Typography, AppBar, Grid, Container, Grow } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

export default function Navbar() {
    const history = useHistory();
    let cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth='))
        .split('=')[1];

    const logout = () => {
        document.cookies = 'auth=false'
        history.push('/login');
        if (document.cookies)
            console.log(document.cookies)
            console.log("cookievalue",cookieValue)
        
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography component={Link} to="/" style={{ flexGrow: 1 }} variant="h5" component="h1" gutterBottom>
                    Inventory Monitor
            </Typography>
                {cookieValue === 'true' ? (<Button variant="contained" color="inherit" onClick={logout}>Logout</Button>)
                    : (<Button component={Link} to="/login" color="inherit">Login</Button>)
                }
            </Toolbar>
        </AppBar>
    )
}