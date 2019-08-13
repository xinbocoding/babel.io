import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SnippetForm from '../Snippet/SnippetForm';
import NavBar from '../NavBar';
import { createSnippetAction } from '../../store/actions/snippetNewPageActions';
import { Redirect } from 'react-router-dom';

const SnippetsNewPage = ({ createSnippet, redirectTo }) => {
  if (redirectTo !== null) {
    return <Redirect to={`/snippets/${redirectTo}`} />;
  }

  return (
    <div className="container-fluid">
      <NavBar />
      <SnippetForm
        onSubmit={({ snippet, marks }) => {
          createSnippet(snippet, marks);
        }}
      />
    </div>
  );
};

SnippetsNewPage.propTypes = {
  redirectTo: PropTypes.string,
  createSnippet: PropTypes.func.isRequired
};

SnippetsNewPage.defaultProps = {
  redirectTo: null
}

const mapStateToProps = state => {
  return {
    redirectTo: state.snippetNewPage.redirectTo,
    error: state.snippetNewPage.error
  };
};

const mapDispatchToProps = dispatch => ({
  createSnippet: (snippet, marks) =>
    dispatch(createSnippetAction(snippet, marks))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsNewPage);
