import firebase from 'firebase';
import { firebaseService } from '../../services';

const PREFIX = 'global:auth';

export const Actions = {
  SIGN_IN_USER: `${PREFIX}:sign-in-user`,
  SIGN_OUT_USER: `${PREFIX}:sign-out-user`
};

export const observeAuthAction = () => {
  return dispatch => {
    firebaseService.auth().onAuthStateChanged(result => {
      const user = result
        ? {
          id: result.uid,
          name: result.displayName
        }
        : null;
      dispatch(
        user === null
          ? { type: Actions.SIGN_OUT_USER }
          : { type: Actions.SIGN_IN_USER, payload: { user } }
      );
    });
  };
};

const authProvider = new firebase.auth.GithubAuthProvider();

export const userSignInAction = () => {
  return dispatch => {
    // initliaze provider
    firebaseService
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebaseService
          .auth()
          .signInWithPopup(authProvider)
          .then()
          .catch(console.log); // TODO
      })
      .catch(console.log); // TODO
  };
};

export const userSignOutAction = () => {
  return dispatch => {
    firebaseService
      .auth()
      .signOut()
      .then()
      .catch(console.log); // TODO
  };
};
