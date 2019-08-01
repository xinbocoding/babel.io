import React from 'react';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SignInButton from '../Auth/SignInButton';

const HomePage = () => (
  <Container maxWidth="md">
    <Grid container justify="flex-end">
      <SignInButton />
    </Grid>
  </Container>
);

export default HomePage;
