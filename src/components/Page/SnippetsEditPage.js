import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import SnippetForm from '../Snippet/SnippetForm';
import Header from '../Elements/Header';
import {
  loadSnippetForEditAction,
  updateSnippetAction
} from '../../store/actions/snippetEditPageActions';
import { SnippetShape, MarkListShap } from '../../utils/shapes';
import '../Snippet/SnippetForm.css';


class SnippetsEditPage extends Component {

  constructor(props) {
    super(props);
    const { match } = props;
    this.state = { id: match.params.id };
  }

  componentDidMount() {
    this.props.fetchSnippet(this.state.id);
  }

  render() {
    const { snippet, marks, updateSnippet, history } = this.props;
    const { id } = this.state;

    if (snippet) {
      return (
        <React.Fragment>
          <Header />
          <div className="container">
            <div className="d-flex flex-column whitebox p-4">
              <h1 className="page-title">Edit Snippet</h1>
              <SnippetForm
                snippet={snippet}
                marks={marks}
                onSubmit={({ snippet, marks, removedMarks }) =>
                  updateSnippet(id, snippet, marks, removedMarks, history)
                }
              />
            </div>
          </div>
        </React.Fragment>
      );
    }
    return <div>loading</div>;
  }
}

SnippetsEditPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  fetchSnippet: PropTypes.func.isRequired,
  updateSnippet: PropTypes.func.isRequired,
  snippet: SnippetShape,
  marks: MarkListShap
};

SnippetsEditPage.defaultProps = {
  snippet: null,
  marks: []
};

const mapStateToProps = state => {
  return {
    snippet: state.snippetEditPage.snippet,
    marks: state.snippetEditPage.marks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSnippet: id => dispatch(loadSnippetForEditAction(id)),
    updateSnippet: (id, snippet, marks, removedMarks, history) =>
      dispatch(updateSnippetAction(id, snippet, marks, removedMarks, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetsEditPage);
