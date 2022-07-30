import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import Fab from '@material-ui/core/Fab';
import AppDrawerBoard from './Drawer/AppDrawerBoard';

import menuConnector from '../../redux/connector/menuConnector';
import CreateBoardModal from '../Board/Form/CreateBoardModal';
import EditPostitMenu from './EditPostitMenu';
import TitleHeader from './TitleHeader';

function Header({
  getDrawer, toggleDrawer, getDevice, setDevice,
  configDevice: { displayEditMenu, displayFullScreenButton, enableAction },
}) {
  const device = getDevice();
  const drawer = getDrawer();
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  }));

  const classes = useStyles();
  const [state, setState] = useState({
    openModalCreateBoard: false,
    theme: true,
  });

  const darkTheme = createMuiTheme({
    palette: {
      type: state.theme ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    setState({
      openModalCreateBoard: state.openModalCreateBoard,
      theme: !state.theme,
    });
  };

  const handleAddBoard = () => {
    setState({
      openModalCreateBoard: true,
      theme: state.theme,
    });
  };

  const displayMenuButton = () => (enableAction ? (
    <IconButton
      onClick={toggleDrawer}
      edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
    >
      <MenuIcon />
    </IconButton>
  ) : (<></>));

  const displayButtonAddBoard = () => (enableAction ? (
    <Fab size="small" color="secondary" onClick={handleAddBoard}>
      <AddIcon fontSize="small" />
    </Fab>
  ) : (<></>));

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setDevice('fullscreen'));
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => setDevice('browser'));
    }
  };

  const handleCloseCreateBoard = () => {
    setState({
      openModalCreateBoard: false,
      theme: state.theme,
    });
  };

  const showFullScreenButton = () => (displayFullScreenButton ? (
    <IconButton onClick={() => toggleFullScreen()}>
      {device === 'fullscreen'
        ? <FullscreenExitIcon fontSize="small" />
        : <FullscreenIcon fontSize="small" />}
    </IconButton>
  ) : (<></>));

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppDrawerBoard drawer={drawer} />
        <CreateBoardModal open={state.openModalCreateBoard} handleClose={handleCloseCreateBoard} />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            { displayMenuButton() }
            <Typography variant="h6" className={classes.title}>
              <TitleHeader />
            </Typography>
            <EditPostitMenu show={displayEditMenu} />
            { showFullScreenButton() }
            <IconButton onClick={handleThemeChange}>
              {state.theme
                ? <Brightness4Icon fontSize="small" />
                : <Brightness7Icon fontSize="small" />}
            </IconButton>
            { displayButtonAddBoard()}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
}

export default menuConnector()(Header);

Header.propTypes = {
  getDrawer: PropTypes.func.isRequired,
  configDevice: PropTypes.shape({
    displayEditMenu: PropTypes.bool.isRequired,
    displayFullScreenButton: PropTypes.bool.isRequired,
    enableAction: PropTypes.bool.isRequired,
  }).isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  getDevice: PropTypes.func.isRequired,
  setDevice: PropTypes.func.isRequired,
};
