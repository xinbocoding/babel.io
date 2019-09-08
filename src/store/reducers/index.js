import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import snippetIndexPageReducer from './snippetIndexPageReducer';
import snippetNewPageReducer from './snippetNewPageReducer';
import snippetShowPageReducer from './snippetShowPageReducer';
import snippetEditPageReducer from './snippetEditPageReducer';

export default combineReducers({
  // services
  auth: authReducer,
  user: userReducer,
  // pages
  snippetShowPage: snippetShowPageReducer,
  snippetNewPage: snippetNewPageReducer,
  snippetEditPage: snippetEditPageReducer,
  snippetIndexPage: snippetIndexPageReducer
});
