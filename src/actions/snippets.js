import firebase from '../services/firebaseApp';

export const loadUserSnippetsAction = userId => {
  return dispatch => {
    dispatch({ type: 'USER_SNIPPETS_REQUEST_START' });
    const db = firebase.firestore();

    db.collection('snippets')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        dispatch({
          type: 'USER_SNIPPETS_REQUEST_SUCCESS',
          data: {
            snippets: snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
          }
        });
      })
      .catch(reason =>
        dispatch({
          type: 'USER_SNIPPETS_REQUEST_ERROR',
          reason
        })
      );
  };
}

// define a action function: createSnippet
export const createSnippetAction = (code, mode, annotations, onSuccess, onFailure) => {
  return dispatch => {
    dispatch({ type: 'CREATE_SNIPPET_START' });
    const db = firebase.firestore();
    db.collection('snippets')
      .add({
        userId: firebase.auth().currentUser.uid,
        code,
        mode,
        annotations
      })
      .then(doc => {
        dispatch({
          type: 'CREATE_SNIPPET_SUCCESS',
          data: {
            id: doc.id
          }
        });
        onSuccess(doc);
      })
      .catch(error => {
        dispatch({
          type: 'CREATE_SNIPPET_ERROR',
          data: {
            error
          }
        });
        onFailure(error);
      });
  };
}

export const loadSnippetAction = (id) => {
  return dispatch => {
    firebase.firestore()
      .collection('snippets')
      .doc(id)
      .get()
      .then(snap => {
        if (snap.exists) {
          dispatch({
            type: 'SNIPPET_SNAPSHOT_LOADED',
            payload: {
              id: snap.id,
              snippet: snap.data()
            }
          });
        }
      });
  };
}
