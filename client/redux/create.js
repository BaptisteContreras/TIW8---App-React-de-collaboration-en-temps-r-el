import {
  createStore, compose, combineReducers, applyMiddleware,
} from 'redux';
import socketMiddleware from './middleware/socketMiddleware';
import createReducers from './reducer';

export default function createAppStore(io) {
  const finalCreateStore = compose(
    applyMiddleware(socketMiddleware(io)),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (v) => v,
  )(createStore);
  const reducers = createReducers();

  return finalCreateStore(combineReducers({ ...reducers }));
}
