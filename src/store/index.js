import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
// import { observeAuthAction } from './actions/authActions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const user = JSON.parse(localStorage.getItem('user'));

  const restoredState = user
    ? { auth: { user }, ...preloadedState }
    : preloadedState;

  const store = createStore(
    rootReducer,
    restoredState,
    composeEnhancers(applyMiddleware(thunk))
  );

  // store.dispatch(observeAuthAction());

  return store;
}
