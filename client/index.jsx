import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@material-ui/core';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import IndexPage from './components/Index/IndexPage';
import createAppStore from './redux/create';
import { parseBoard, parseDevice, parsePostit } from './parser/index';
import {
  setCurrentBoard,
  getCurrentBoard,
  getCurrentPostit,
} from './redux/modules/boards';
import { getConfigDevice, setDevice } from './redux/modules/global';
import Footer from './components/Footer/Footer';
import createClientSocket from './socket/clientSocket';
import bindClientEvents from './socket/bindClientEvents';
import BoardPage from './container/BoardPage';

const socket = createClientSocket();
const store = createAppStore(socket);
bindClientEvents(socket, store);

const setBoardDispatch = (hash) => {
  const indexBoard = parseBoard(hash);
  if (indexBoard !== store.getState().boards.board) {
    store.dispatch(setCurrentBoard(indexBoard, parsePostit(hash)));
  }
};

const setDeviceDispatch = (hash) => {
  store.dispatch(setDevice(parseDevice(hash)));
};

setBoardDispatch(window.location.hash);
setDeviceDispatch(window.location.hash);

const App = () => {
  // Update Redux if we navigated via browser's back/forward
  // most browsers restore scroll position automatically
  // as long as we make content scrolling happen on document.body
  window.addEventListener('popstate', () => {
    setBoardDispatch(window.location.hash);
    setDeviceDispatch(window.location.hash);
  });

  store.subscribe(() => {
    const board = getCurrentBoard(store.getState());
    const postit = getCurrentPostit(store.getState());
    let hash = `#/${store.getState().global.device}`;
    if (board) {
      hash += `/board/${board.id}`;
      if (store.getState().global.device === 'mobile' && postit) {
        hash += `/postit/${postit.id}`;
      }
      if (window.location.hash !== hash) {
        window.location.hash = hash;
        // Force scroll to top this is what browsers normally do when
        // navigating by clicking a link.
        // Without this, scroll stays wherever it was which can be quite odd.
        document.body.scrollTop = 0;
      }
    } else if (window.location.hash !== hash) {
      window.location.hash = hash;
      document.body.scrollTop = 0;
    }
  });

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route path="/:device/board/:id" render={() => (<BoardPage displayAll={getConfigDevice(store.getState()).displayAllPostits} />)} />
            <Route exact path="/" render={() => (<IndexPage />)} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
