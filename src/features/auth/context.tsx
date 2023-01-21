import { createContext, Dispatch, useReducer } from 'react';
import type { AuthActions } from './action';
import { authReducer } from './reducer';
import { AuthState, initialState } from './state';

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// useContext hook - export here to keep code for global auth state
// together in this file, allowing user info to be accessed and updated
// in any functional component using the hook
// export const useAuth: any = () => useContext(AuthContext);
