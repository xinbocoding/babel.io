import React, { Component } from 'react';
import { auth } from 'firebase';
import { connect } from 'react-redux';

class SignIn extends Component {

  onSignInClick() {

    // initliaze provider
    let provider = new auth.GoogleAuthProvider();

    auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // log
      console.log(result);

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      console.log(error);
    });

  }

  render() {
    return <button onClick={this.onSignInClick.bind(this)}>Sign In</button>;
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (name, idToken) {
      dispatch({
        type: 'SIGN_IN_USER',
        payload: {
          name,
          idToken
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
