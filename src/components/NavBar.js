import React from 'react';
import SignIn from './auth/SignIn';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class NavBar extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <SignIn />
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default NavBar;
