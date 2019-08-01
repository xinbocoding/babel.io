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
    const onError = () => {
      dispatch({
        type: Actions.CHANGE_STATE,
        payload: {
          user: null
        }
      });
    };
    // initliaze provider
    firebaseService
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebaseService
          .auth()
          .signInWithPopup(authProvider)
          .then(result => {
            dispatch({
              type: Actions.CHANGE_STATE,
              payload: {
                user: {
                  id: result.user.uid,
                  name: result.user.displayName
                }
              }
            });
          })
          .catch(console.log); // TODO
      })
      .catch(onError); // TODO
  };
};

export const userSignOutAction = () => {
  return dispatch => {
    firebaseService
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: 'SIGN_OUT_SUCCESS'
        });
      })
      .catch(console.log); // TODO
  };
};
