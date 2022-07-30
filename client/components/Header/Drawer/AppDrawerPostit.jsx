import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import menuConnector from '../../../redux/connector/menuConnector';
import DrawerListPostit from './DrawerListPostit';

function AppDrawerPostit({ open, configDevice: { displayAllPostits }, toggle }) {
  return (
    <>
      <Drawer anchor="bottom" open={open} onClose={toggle}>
        <DrawerListPostit displayAll={displayAllPostits} toggleDrawer={toggle} />
      </Drawer>
    </>
  );
}

export default menuConnector()(AppDrawerPostit);

AppDrawerPostit.propTypes = {
  open: PropTypes.bool.isRequired,
  configDevice: PropTypes.shape({
    displayAllPostits: PropTypes.bool.isRequired,
  }).isRequired,
  toggle: PropTypes.func.isRequired,
};
