import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './authReducer';
import snippetIndexPageReducer from './snippetIndexPageReducer';
import snippetNewPageReducer from './snippetNewPageReducer';
import snippetShowPageReducer from './snippetShowPageReducer';
import snippetEditPageReducer from './snippetEditPageReducer';

export default history =>
  combineReducers({
    // router
    router: connectRouter(history),
    // services
    auth: authReducer,
    // pages
    snippetShowPage: snippetShowPageReducer,
    snippetNewPage: snippetNewPageReducer,
    snippetEditPage: snippetEditPageReducer,
    snippetIndexPage: snippetIndexPageReducer
  });
