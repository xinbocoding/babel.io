import { combineReducers } from 'redux';
import Firebase from '../services/firebase';
/**
 * Combined reducers:
 * https://redux.js.org/api/combinereducers
 */

const firebase = new Firebase();


function firebaseReducer(state = {}, action) {
    let updated = {...state}
    if (updated.firebase == undefined) {
        updated.firebase = firebase;
    }
    return updated;
}

function snippetReducer(state = {}, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
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
    firebase: firebaseReducer,
    snippet: snippetReducer
}

const combinedReducers = combineReducers(reducerMap)

export default combinedReducers;
