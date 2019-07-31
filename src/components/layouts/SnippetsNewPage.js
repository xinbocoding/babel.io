import React from 'react';
import { Container } from '@material-ui/core';
import SnippetForm from '../snippets/SnippetForm';
import NavBar from '../NavBar';
import { connect } from 'react-redux';
import { createSnippetAction } from '../../actions/snippets';

class SnippetsNewPage extends React.Component {

  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  onSuccess(doc) {
    this.props.history.push('/snippets/' + doc.id);
  }

  onFailure(error) {
    console.log(error);
  }

  render() {
    const { create } = this.props;
    return (
      <Container>
        <NavBar />
        <SnippetForm
          mode="javascript"
          code=""
          onSubmit={(code, mode, annotations) => {
            create(code, mode, annotations, this.onSuccess, this.onFailure)
          }}
        />
      </Container>
    )
  }
};

const mapStateToProps = () => {
  return {

  };
}

const mapDispatchToProps = dispatch => ({
  create: (code, mode, annotations, callback) => {
    dispatch(createSnippetAction(code, mode, annotations, callback));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SnippetsNewPage);
