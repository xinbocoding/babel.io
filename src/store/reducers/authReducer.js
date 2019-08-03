import { Actions } from '../actions/authActions';

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case Actions.SIGN_IN_USER:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user
      };
    case Actions.SIGN_OUT_USER:
      localStorage.removeItem('user');
      return {
        ...state,
        user: null
      };
    default:
      return { ...state };
  }
}
