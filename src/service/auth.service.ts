import type { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export const AuthService = {
  checkAuth: (ctx: GetServerSidePropsContext) => {
    // Get the `auth-token` cookie
    const authToken = parseCookies(ctx)['auth-token'];
    return authToken ? true : false;
  },
};
