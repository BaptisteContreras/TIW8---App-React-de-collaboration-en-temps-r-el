import React from 'react';
import PropTypes from 'prop-types';
import DesktopBoard from '../components/Board/DesktopBoard';
import MobileBoard from '../components/Board/MobileBoard';
import menuConnector from '../redux/connector/menuConnector';

function BoardPage({
  displayAll, getDevice,
  configDevice: { enableDraw, enableAction },
}) {
  const device = getDevice();

  const displayContentMobile = () => (
    <MobileBoard
      displayAll={displayAll}
      enableDraw={enableDraw}
      enableAction={enableAction}
    />
  );

  const displayContentComputer = () => (
    <>
      <DesktopBoard
        displayAll={displayAll}
        enableDraw={enableDraw}
        enableAction={enableAction}
      />
    </>
  );

  return device === 'mobile' ? displayContentMobile() : displayContentComputer();
}

export default menuConnector()(BoardPage);

BoardPage.propTypes = {
  getDevice: PropTypes.func.isRequired,
  displayAll: PropTypes.bool.isRequired,
  configDevice: PropTypes.shape({
    enableDraw: PropTypes.bool.isRequired,
    enableAction: PropTypes.bool.isRequired,
  }),
};
