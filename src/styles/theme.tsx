import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#9CF9FC',
      main: '#06bcc1',
      dark: '#05858A',
    },
    secondary: {
      light: '#D0E0F1',
      main: '#34A8D5',
      dark: '#12263a',
    },
  },
  // components: {
  //   MuiInputBase: {
  //     styleOverrides: {
  //       input: {
  //         textAlign: 'center',
  //       },
  //     },
  //   },
  // },
});

export default theme;
