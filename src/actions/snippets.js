import firebase from '../services/firebase';

export const loadUserSnippetsAction = (userId) => {
  return (dispatch) => {
    dispatch({ type: 'USER_SNIPPETS_REQUEST_START' });

    firebase.firestore().collection('snippets').get()
      .then((snapshot) => {
        dispatch({
          type: 'USER_SNIPPETS_REQUEST_SUCCESS',
          data: {
            snippets: snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id }
            })
          }
        })
      })
      .catch((reason) => dispatch({
        type: 'USER_SNIPPETS_REQUEST_ERROR',
        reason
      }))
  }
}

// define a action function: createSnippet
export const createSnippetAction = (code, lang) => {
  return (dispatch) => {

    dispatch({type: 'CREATE_SNIPPET_START'});

    firebase.firestore().collection('snippets').add({
      code: code,
      lang: lang
    }).then((doc) => {
      dispatch({
        type: 'CREAT_SNIPPET_SUCCESS',
        data: doc
      })
    }).catch((error) => {
      dispatch({
        type: 'CREAT_SNIPPET_ERROR'
      })
    })
  }
}
