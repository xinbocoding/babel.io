import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SignIn from './auth/SignIn';

const styled = withStyles({
  appBar: {
    boxShadow: 'none',
  },
  toolbar: {
    borderBottom: '1px solid whitesmoke',
  },
});

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            <SignIn />
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default styled(NavBar);
