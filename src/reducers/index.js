import { combineReducers } from 'redux';
import firebase from '../services/firebase';
/**
 * Combined reducers:
 * https://redux.js.org/api/combinereducers
 */

function userReducer(state = {}, action) {
  switch (action.type) {
    case 'SIGN_IN_USER':
      state = {
        name: action.payload.name,
        token: action.payload.idToken
      }
      break;
    default:
      return state;
  }
  return state;
}

function snippetReducer(state = {}, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'CREATE_SNIPPET':
      let snippets = firebase.firestore.collection('snippets');
      snippets.add({
        code: action.payload['code'],
        lang: "text"
      })
      break;
    default:
      return state;
  }

  return newState;
}

let reducerMap = {
  user: userReducer,
  snippet: snippetReducer
}

const combinedReducers = combineReducers(reducerMap)

export default combinedReducers;
