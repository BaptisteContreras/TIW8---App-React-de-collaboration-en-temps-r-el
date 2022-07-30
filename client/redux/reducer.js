import global from './modules/global';
import boards from './modules/boards';

export default function createReducers() {
  return {
    global,
    boards,
  };
}
