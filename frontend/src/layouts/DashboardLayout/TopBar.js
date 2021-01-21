import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import {
  selectIsLoadingAuth,
  // selectOpenSignIn,
  // selectOpenSignUp,
  // setOpenSignIn,
  // resetOpenSignIn,
  // setOpenSignUp,
  // resetOpenSignUp,
  resetOpenProfile,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncLogin,
  fetchAsyncRegister,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncCreateProf,
} from "../../features/auth/authSlice";


const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const navigate = useNavigate()
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch = useDispatch();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          {/* <Logo /> */}
          <WhiteTextTypography variant="h3">
            React Django SPA
          </WhiteTextTypography>
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
           color="inherit"
           onClick={() => {
            localStorage.removeItem("localJWT");
            // dispatch(editNickname(""));
            // dispatch(resetOpenProfile());
            navigate('/login/', { replace: true });
           }}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
