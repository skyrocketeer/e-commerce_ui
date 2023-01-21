import { User } from '~types/user';

export interface AuthState {
  isLoggedIn: boolean;
  userInfo: User | null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  userInfo: null,
};
