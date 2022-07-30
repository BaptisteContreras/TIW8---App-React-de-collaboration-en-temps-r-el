import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import menuConnector from '../../redux/connector/menuConnector';
import ButtonPostits from './ButtonPostits';

function Footer({ getDevice, configDevice: { displayAllPostits } }) {
  const device = getDevice();
  const useStyles = makeStyles(() => ({
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
    },
  }));

  const classes = useStyles();

  return (device === 'mobile' ? (
    <>
      <BottomNavigation
        showLabels
        className={classes.stickToBottom}
      >
        <ButtonPostits allVisible={displayAllPostits} />
      </BottomNavigation>
    </>
  ) : (<></>));
}

export default menuConnector()(Footer);

Footer.propTypes = {
  getDevice: PropTypes.func.isRequired,
  configDevice: PropTypes.shape({
    displayAllPostits: PropTypes.bool.isRequired,
  }).isRequired,
};
