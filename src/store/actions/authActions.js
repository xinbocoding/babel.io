import axios from 'axios';

const PREFIX = 'global:auth';


export const Actions = {
  SIGN_IN_USER: `${PREFIX}:sign-in-user`,
  SIGN_OUT_USER: `${PREFIX}:sign-out-user`
};

export const userSignInAction = (tokenId) => {
  return dispatch => {
    axios.post('http://localhost:5000/api/login', {
      username: 'x-token-auth',
      password: tokenId
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const userSignOutAction = () => {
  // return dispatch => {
  //   firebaseService
  //     .auth()
  //     .signOut()
  //     .then()
  //     .catch(console.log); // TODO
  // };
};
