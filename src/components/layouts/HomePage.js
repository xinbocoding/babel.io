import React from 'react';
import SignIn from '../auth/SignIn';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import HomeHeadline from '../home/HomeHeadline';
import Grid from '@material-ui/core/Grid';
import HomeExample from '../home/HomeExample';

class HomePage extends React.Component {

  render() {
    if (this.props.user.isSignedIn) {
      return <Redirect to={{ pathname: '/snippets' }} />;
    }

    return (
      <Container maxWidth="md">
        <Grid container justify="flex-end">
          <SignIn />
        </Grid>

        <Grid container>
          <HomeHeadline />
        </Grid>

        <Grid container>
          <HomeExample />
        </Grid>
      </Container>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(HomePage);
