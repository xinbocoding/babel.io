import { Actions } from '../actions/authActions';

/**
 * For guest, the auth is `null`.
 * For a signed in user, the auth is an object with shape:
 *
 *    {
 *      id: string,
 *      name: string,
 *      [optional attributes]
 *    }
 */
export default function authReducer(state = {}, action) {
  switch (action.type) {
    case Actions.CHANGE_STATE:
      return {
        ...state,
        user: action.payload.user
      }
    default:
      return { ...state };
  }
}
