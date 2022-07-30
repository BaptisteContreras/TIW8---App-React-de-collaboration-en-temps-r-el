import { setAllStateLocal } from '../../redux/modules/boards';

export default function bindGlobalSocket(io, store) {
  io.on('connect', () => {
    // console.log('connected');
    io.emit('NEED_SYNCHRO');
  });
  io.on('SET_STATE', (data) => {
    store.dispatch(setAllStateLocal(data.state));
  });
  io.on('GET_STATE', (data) => {
    io.emit('SEND_SYNCHRO', { src: data.src, state: store.getState().boards });
  });
}
