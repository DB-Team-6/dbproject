import React, { useState } from "react";
import {Grid, Container, Grow } from '@material-ui/core';
import Home from './Home';
import Login from './Login';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
// import { styles } from './utils'
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

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

export default function App(props) {
  const {classes} = props;

  
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Grid>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" 
                  component={Login} />
          </Switch>
        </Grid>
      </Container>
    </Router>
  )
}
