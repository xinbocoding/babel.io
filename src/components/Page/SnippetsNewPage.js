import React from 'react';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import SnippetForm from '../Snippet/SnippetForm';
import NavBar from '../NavBar';
import { createSnippetAction } from '../../store/actions/snippetNewPageActions';

const SnippetsNewPage = ({ createSnippet, history }) => {
  return (
    <div class="container">
      <NavBar />
      <SnippetForm
        onSubmit={({ snippet, marks }) => {
          createSnippet(snippet, marks, history);
        }}
      />
    </div>
  );
};

SnippetsNewPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  createSnippet: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    error: state.snippetNewPage.error
  };
};

const mapDispatchToProps = dispatch => ({
  createSnippet: (snippet, marks, history) =>
    dispatch(createSnippetAction(snippet, marks, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsNewPage);
