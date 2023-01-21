import { ActionType, AuthActions } from './action';
import { AuthState, initialState } from './state';

export const authReducer = (
  state: AuthState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case ActionType.Login:
      return {
        ...initialState,
        isLoggedIn: action.payload.isLoggedIn,
        userInfo: action.payload.userInfo,
      };
    case ActionType.Logout:
      return initialState;
    default:
      return state;
  }
};
