import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const auth = JSON.parse(localStorage.getItem('APP_AUTH'));

const store = createStore(
  combinedReducers,
  { auth },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
