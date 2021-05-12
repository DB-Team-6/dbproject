import React, { useState } from "react";
import { Grid, Container } from '@material-ui/core';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
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
  const [loginStateChange, setLoginStateChange] = useState(null)

  const handleLogin = () => {
    setLoginStateChange(!loginStateChange)
  }

  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar handleLogin={handleLogin} />
        <Grid>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login"
              render={(props) => (
                <Login {...props} handleLogin={handleLogin} />
              )}
            />
          </Switch>
        </Grid>
      </Container>
    </Router>
  )
}
