import { applyMiddleware, createStore, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';
import { observeAuthAction } from './actions/authActions';

export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const user = JSON.parse(localStorage.getItem('user'));

  const restoredState = user
    ? { auth: { user }, ...preloadedState }
    : preloadedState;

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    restoredState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        routerMiddleware(history) // for dispatching history actions
      )
    )
  );

  store.dispatch(observeAuthAction());

  return store;
}
