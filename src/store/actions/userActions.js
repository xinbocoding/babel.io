import { firebaseService } from '../../services';

const PREFIX = 'global:user';

export const Actions = {
  GET_USER_SUCCESS: `${PREFIX}:get-user-success`
};

export const getUserInfoAction = id => {
  return dispatch => {
    const func = firebaseService.callable('userInfo');
    func({ id })
      .then(result => {
        dispatch({
          type: Actions.GET_USER_SUCCESS,
          payload: {
            id,
            data: result.data
          }
        });
      })
      .catch(console.log);
  };
};
