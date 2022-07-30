import {
  createCurrentBoardLocal, createPostitLocal, getCurrentBoard, getCurrentPostit,
  removePostitBoardLocal,
  setCurrentBoardLocal, setCurrentPostitLocal, updatePostitLocal,
} from '../../redux/modules/boards';
import { getConfigDevice } from '../../redux/modules/global';

export default function bindBoardSocket(io, store) {
  io.on('CHANGE_BOARD', (data) => {
    store.dispatch(setCurrentBoardLocal(
      data.board,
      data.postit,
      getConfigDevice(store.getState()).displayAllPostits,
    ));
  });
  io.on('CREATE_BOARD', (data) => {
    store.dispatch(createCurrentBoardLocal(data.type,
      data.title,
      data.id,
      data.notes,
      data.postits));
  });
  io.on('CHANGE_POSTIT', (data) => {
    store.dispatch(setCurrentPostitLocal(data));
  });
  io.on('CREATE_POSTIT', (data) => {
    store.dispatch(createPostitLocal(data.idBoard, data.postit));
  });
  io.on('DELETE_POSTIT', (data) => {
    store.dispatch(removePostitBoardLocal(data.idBoard, data.idPostit, data.allDisplay));
  });
  io.on('UPDATE_POSTIT', (data) => {
    store.dispatch(updatePostitLocal(data.idBoard, data.postit));
    if (data.postit.id === getCurrentPostit(store.getState()).id && !data.postit.visible) {
      const postit = getCurrentBoard(store.getState()).postits
        .filter((e) => e.visible || data.displayAll).filter((e) => e.id !== data.postit.id)[0];
      if (postit) {
        store.dispatch(setCurrentPostitLocal(postit.id));
      } else {
        store.dispatch(setCurrentPostitLocal(null));
      }
    }
  });
}
