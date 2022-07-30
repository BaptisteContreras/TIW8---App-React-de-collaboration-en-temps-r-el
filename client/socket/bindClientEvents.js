import bindBoardSocket from './modules/boards';
import bindGlobalSocket from './modules/global';

export default function bindClientEvents(io, store) {
  bindBoardSocket(io, store);
  bindGlobalSocket(io, store);
}
