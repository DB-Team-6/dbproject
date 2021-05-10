import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Home from './Home';
import Login from './Login';
import { AppContext } from './libs/contextLib';
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

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const { classes } = props;
  return (
    <Router>
      <Container style={{flexGrow: 1}} maxWidth="lg">
        <AppBar>
          <Toolbar>
            <Typography style={{flexGrow: 1}} variant="h5" component="h1" gutterBottom>
            Inventory Monitor
            </Typography>
            <Button  color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Grid>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </Grid>
      </Container>
    </Router>
  )
}
