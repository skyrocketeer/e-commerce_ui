import type { GetServerSidePropsContext } from 'next';
import { useContext } from 'react';
import { ActionType } from '~features/auth/action';
import { AuthContext } from '~features/auth/context';
import { AuthService } from '~service/auth.service';

export type AuthProps = {
  readonly role?: 'admin';
  isLoggedIn: boolean;
  children: JSX.Element;
};

export const AuthGuard = ({ children, role, isLoggedIn }: AuthProps) => {
  console.log(isLoggedIn);
  // if (isClient) {
  const { state, dispatch } = useContext(AuthContext);
  // console.log(state);
  dispatch({
    type: ActionType.Login,
    payload: { isLoggedIn: true, userInfo: null },
  });
  // if (isLoggedIn) {
  return <>{children}</>;
  // }

  // if (loading === AuthState.LOADING) {
  //   return <>Loading...</>;
  // }

  // if (role === 'admin' && currentUser?.roles.includes('BUYER')) {
  //   return <>{children}</>;
  // }
  // return (
  //   <Layout title={'Oops, error occured'}>
  //     <>
  //       <h2 className='text-center py-5 text-lg font-semibold'>Unauthorized</h2>
  //       <div className='text-center'>
  //         You don't have permission to access this page. Please contact an admin
  //         if you think something is wrong
  //       </div>
  //       <div className='text-center mt-6'>
  //         <a href='/' className='p-3 bg-indigo-500 text-white rounded-md'>
  //           Go back
  //         </a>
  //       </div>
  //     </>
  //   </Layout>
  // );
};

export async function requireAuthentication(ctx: GetServerSidePropsContext) {
  const isLoggedIn = await AuthService.checkAuth(ctx);

  // if (!isLoggedIn) {
  // Redirect to login page
  // console.info('run');

  // await gssp(ctx); // Continue on to call `getServerSideProps` logic
  return { props: isLoggedIn };
  // };
}
