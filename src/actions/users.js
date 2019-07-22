import { auth } from 'firebase';
import firebase from '../services/firebase';

export const userSignInAction = () => {
  return (dispatch) => {
    // initliaze provider
    let provider = new auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      dispatch({
        type: 'SIGN_IN_SUCCESS',
        data: {
          name: result.user.displayName,
          token: result.credential.accessToken,
        }
      })
    }).catch((error) => {
      dispatch({
        type: 'SIGIN_IN_FAILED',
        data: {
          error: {
            code: error.code,
            message: error.message,
          }
        }
      })
    });
  }
}

export const userSignOutAction = () => {
  return (dispatch) => {
    firebase.auth().signOut().then(function() {
      dispatch({
        type: 'SIGN_OUT_SUCCESS'
      })
    }).catch(function(error) {
      dispatch({
        type: 'SIGN_OUT_FAILED',
        error: error
      })
    });
  }
}

