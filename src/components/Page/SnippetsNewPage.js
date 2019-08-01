import React from 'react';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import SnippetForm from '../Snippet/SnippetForm';
import NavBar from '../NavBar';
import { createSnippetAction } from '../../store/actions/snippetNewPageActions';
import { AuthShape } from '../../utils/shapes';

const SnippetsNewPage = ({ auth, createSnippet, history }) => {
  return (
    <Container>
      <NavBar />
      <SnippetForm
        onSubmit={data => {
          createSnippet(
            {
              userId: auth.id,
              ...data
            },
            history
          );
        }}
      />
    </Container>
  );
};

SnippetsNewPage.propTypes = {
  auth: AuthShape.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  createSnippet: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    error: state.snippetNewPage.error
  };
};

const mapDispatchToProps = dispatch => ({
  createSnippet: (data, history) => dispatch(createSnippetAction(data, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsNewPage);
