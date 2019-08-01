import { combineReducers } from 'redux';

import authReducer from './authReducer';
import snippetIndexPageReducer from './snippetIndexPageReducer';
import snippetNewPageReducer from './snippetNewPageReducer';
import snippetShowPageReducer from './snippetShowPageReducer';
import snippetEditPageReducer from './snippetEditPageReducer';

const reducerMap = {
  // services
  auth: authReducer,
  // pages
  snippetShowPage: snippetShowPageReducer,
  snippetNewPage: snippetNewPageReducer,
  snippetEditPage: snippetEditPageReducer,
  snippetIndexPage: snippetIndexPageReducer
};

export default combineReducers(reducerMap);
