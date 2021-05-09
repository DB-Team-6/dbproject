import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Home from './Home';
import Login from './Login';
// import { styles } from './utils'
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, BrowserRouter as Router} from "react-router-dom";



export default function App(props) {

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const { classes } = props;
  return (
    <Router>
      <Container maxWidth="lg">
        <Grid  >
          <Grid >
            <Typography variant="h4" component="h1" gutterBottom>
              Pizza Inventory
          </Typography>
          </Grid>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />

          </Switch>
          
        </Grid>
      </Container>
    </Router>
  )
}
