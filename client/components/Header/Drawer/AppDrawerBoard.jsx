import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import DrawerListBoard from './DrawerListBoard';
import menuConnector from '../../../redux/connector/menuConnector';

function AppDrawerBoard({ getDrawer, toggleDrawer }) {
  return (
    <>
      <Drawer anchor="left" open={getDrawer()} onClose={toggleDrawer}>
        <DrawerListBoard toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
}

export default menuConnector()(AppDrawerBoard);

AppDrawerBoard.propTypes = {
  getDrawer: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};
