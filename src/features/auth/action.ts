import { User } from '~types/user';

export enum ActionType {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

export interface Login {
  type: ActionType.Login;
  payload: {
    isLoggedIn: boolean;
    userInfo: User | null;
  };
}

export interface Logout {
  type: ActionType.Logout;
}

export type AuthActions = Login | Logout;
