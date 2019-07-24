import React from 'react';
import SignIn from '../auth/SignIn';
import { Container } from '@material-ui/core';
import HomeHeadline from '../home/HomeHeadline';
import Grid from '@material-ui/core/Grid';
import HomeExample from '../home/HomeExample';

class HomePage extends React.Component {
  render() {
    return (
      <Container maxWidth="md">
        <Grid container justify="flex-end">
          <SignIn/>
        </Grid>

        <Grid container>
          <HomeHeadline/>
        </Grid>

        <Grid container>
          <HomeExample/>
        </Grid>
      </Container>
    );
  }

}

export default HomePage;
