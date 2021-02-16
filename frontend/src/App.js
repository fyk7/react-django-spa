import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useSelector } from "react-redux";
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { selectLoggedIn } from './features/auth/authSlice';

const App = () => {
  const isLoggedin = useSelector(selectLoggedIn);
  // const { isLoggedin }  = useSelector(selectLoggedIn); としない!!
  const routing = useRoutes(routes(isLoggedin));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
