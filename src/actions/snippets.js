import firebase from '../services/firebaseApp';

export const loadUserSnippetsAction = userId => (dispatch) => {
  dispatch({ type: 'USER_SNIPPETS_REQUEST_START' });

  firebase
    .firestore()
    .collection('snippets')
    .where('userId', '==', userId)
    .get()
    .then((snapshot) => {
      dispatch({
        type: 'USER_SNIPPETS_REQUEST_SUCCESS',
        data: {
          snippets: snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })),
        },
      });
    })
    .catch(reason => dispatch({
        type: 'USER_SNIPPETS_REQUEST_ERROR',
        reason,
      }),
    );
};

// define a action function: createSnippet
export const createSnippetAction = (lang, code) => (dispatch) => {
  dispatch({ type: 'CREATE_SNIPPET_START' });
  firebase
    .firestore()
    .collection('snippets')
    .add({
      userId: firebase.auth().currentUser.uid,
      code,
      lang,
    })
    .then((doc) => {
      dispatch({
        type: 'CREATE_SNIPPET_SUCCESS',
        data: {
          id: doc.id,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: 'CREATE_SNIPPET_ERROR',
        data: {
          error,
        },
      });
    });
};

export function loadSnippetAction(id) {
  return (dispatch) => {
    firebase
      .firestore()
      .collection('snippets')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({
            type: 'LOAD_SNIPPET_SUCCESS',
            data: {
              snippet: doc.data(),
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'LOAD_SNIPPET_FAILED',
          data: {
            error,
          },
        });
      });
  };
}
