import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { AuthProvider } from '~features/auth/context';
import theme from '~styles/theme';

// type MyAppProps = AppProps & {
//   pageProps: { initialReduxState: AppState };
// };

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   //initialise redux store on server side
//   // const reduxStore = initializeStore();
//   appProps.pageProps = {
//     ...appProps.pageProps,
//     initialReduxState: store,
//   };

//   return appProps;
// };

export default MyApp;
