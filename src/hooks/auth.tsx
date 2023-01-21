import { Dispatch } from 'react';
import { ActionType, AuthActions } from '~features/auth/action';
import axios from '~service/axios';
import { LoginPayload } from '~types/auth';
import { User } from '~types/user';

export const useLogin = (
  data: LoginPayload,
  dispatch: Dispatch<AuthActions>
) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post('/api/auth/login', data)
      .then(async (res) => {
        console.log(res);
        if (res.data.accessToken) {
          const profile: User = await axios
            .post('/api/user/profile/me')
            .then((res) => res.data)
            .catch((err) => {
              console.error(err.response);
              reject(err.response);
            });
          dispatch({
            type: ActionType.Login,
            payload: { isLoggedIn: true, userInfo: { ...profile } },
          });
          resolve(profile);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const useLogout = async (dispatch: Dispatch<AuthActions>) => {
  // clear cookie
  axios.post('/api/logout').catch((err) => Promise.reject(err.message));
  await dispatch({ type: ActionType.Logout });
  return Promise.resolve();
};
