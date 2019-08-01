import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SignInButton from './Auth/SignInButton';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          <SignInButton />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
