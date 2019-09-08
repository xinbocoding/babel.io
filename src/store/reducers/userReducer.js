import { Actions } from '../actions/userActions';

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case Actions.GET_USER_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload.data
      };
    default:
      return { ...state };
  }
}
