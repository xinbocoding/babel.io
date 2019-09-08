import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SnippetForm from '../Snippet/SnippetForm';
import Header from '../Elements/Header';
import { createSnippetAction } from '../../store/actions/snippetNewPageActions';

const SnippetsNewPage = ({ createSnippet, history }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="d-flex flex-column whitebox p-4">
          <h1 className="page-title">Create Snippet</h1>
          <SnippetForm
            onSubmit={({ snippet, marks }) => {
              createSnippet(snippet, marks, id => history.push(`/s/${id}`));
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

SnippetsNewPage.propTypes = {
  createSnippet: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    redirectTo: state.snippetNewPage.redirectTo,
    error: state.snippetNewPage.error
  };
};

const mapDispatchToProps = dispatch => ({
  createSnippet: (snippet, marks, cb) =>
    dispatch(createSnippetAction(snippet, marks, cb))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SnippetsNewPage)
);
