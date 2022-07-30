export const TOGGLE_DRAWER = 'tiw8/global/TOGGLE_DRAWER';
export const SET_USERNAME = 'tiw8/global/SET_USERNAME';
export const SET_DEVICE = 'tiw8/global/SET_DEVICE';

const initialState = {
  drawer: false,
  username: null,
  device: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_DRAWER: {
      return {
        ...state,
        drawer: !state.drawer,
      };
    }
    case SET_DEVICE: {
      return {
        ...state,
        device: action.payload,
      };
    }
    default:
      return state;
  }
}

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

export function setDevice(device) {
  return {
    type: SET_DEVICE,
    payload: device,
  };
}

export function getConfigDevice(state) {
  switch (state.global.device) {
    case 'mobile': {
      return {
        displayAllPostits: false,
        displayEditMenu: false,
        displayFullScreenButton: false,
        enableDraw: true,
        enableAction: true,
      };
    }
    case 'browser': {
      return {
        displayAllPostits: true,
        displayEditMenu: true,
        displayFullScreenButton: true,
        enableDraw: true,
        enableAction: true,
      };
    }
    case 'fullscreen': {
      return {
        displayAllPostits: false,
        displayEditMenu: false,
        displayResetDrawButton: false,
        displayFullScreenButton: true,
        enableDraw: false,
        enableAction: false,
      };
    }
    default: {
      return {
        displayAllPostits: false,
        displayEditMenu: false,
        displayFullScreenButton: true,
        enableDraw: false,
        enableAction: false,
      };
    }
  }
}
