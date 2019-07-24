import { auth } from 'firebase';
import app from '../services/firebaseApp';
import firebase from 'firebase';

export const userSignInAction = () => {
  // return (dispatch) => {
    // initliaze provider
    let provider = new auth.GoogleAuthProvider();

    app.auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        app.auth().signInWithPopup(provider)
          .then((result) => {
            // dispatch({
            //   type: 'SIGN_IN_SUCCESS',
            //   data: {
            //     id: result.user.uid,
            //     name: result.user.displayName,
            //     token: result.credential.accessToken,
            //   }
            // })
          }).catch((error) => {
            // dispatch({
            //   type: 'SIGIN_IN_FAILED',
            //   data: {
            //     error: {
            //       code: error.code,
            //       message: error.message,
            //     }
            //   }
            // })
          });

      })
      .catch(function (error) {
        console.log('Firebase: set persistence failed. ', error);
      });
  // }
}

export const userSignOutAction = () => {
  // return (dispatch) => {
    app.auth().signOut().then(function () {
      // dispatch({
      //   type: 'SIGN_OUT_SUCCESS'
      // })
    }).catch(function (error) {
      // dispatch({
      //   type: 'SIGN_OUT_FAILED',
      //   error: error
      // })
    });
  // }
}

