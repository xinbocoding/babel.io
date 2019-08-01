import firebase from 'firebase';
import { firebaseService } from '../../services';

const PREFIX = 'global:auth';

export const Actions = {
  CHANGE_STATE: `${PREFIX}:change-state`
};

export const observeAuthAction = () => {
  return dispatch => {
    firebaseService.auth().onAuthStateChanged(user => {
      const payload = user
        ? {
          id: user.uid,
          name: user.displayName
        }
        : null;
      dispatch({ type: Actions.CHANGE_STATE, payload });
    });
  };
};

const authProvider = new firebase.auth.GoogleAuthProvider();

export const userSignInAction = () => {
  return dispatch => {
    const onError = () => {
      dispatch({
        type: Actions.CHANGE_STATE,
        payload: null
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
                id: result.user.uid,
                name: result.user.displayName
              }
            });
          })
          .catch(onError); // TODO
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
          type: 'SIGN_OUT_SUCCESS',
          payload: null
        });
      })
      .catch(error => console.log(error)); // TODO
  };
};
