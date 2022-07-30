import { connect } from 'react-redux';
import {
  toggleDrawer, setDevice, getConfigDevice,
} from '../modules/global';

export default function menuConnector() {
  return connect(
    (state) => ({
      global: state.global,
      getDevice: () => state.global.device,
      getDrawer: () => state.global.drawer,
      configDevice: getConfigDevice(state),
      boardsState: state.boards,
    }),
    {
      toggleDrawer, setDevice,
    },
  );
}
