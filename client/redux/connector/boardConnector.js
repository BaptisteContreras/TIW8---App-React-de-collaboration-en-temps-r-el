import { connect } from 'react-redux';
import {
  getCurrentBoard, setCurrentBoard, createCurrentBoard, createPostit, deleteBoard,
  removePostitBoard, getCurrentPostit, nextPostit, previousPostit, setCurrentPostit,
  updatePostit, addDrawPoints, resetDrawPoints,
} from '../modules/boards';

export default function boardConnector() {
  return connect(
    (state) => ({
      boards: state.boards.boards,
      getCurrentBoard: () => getCurrentBoard(state),
      getCurrentPostit: () => getCurrentPostit(state),
      nextPostit: nextPostit(state),
      previousPostit: previousPostit(state),
    }),
    {
      setCurrentBoard,
      createCurrentBoard,
      removePostitBoard,
      setCurrentPostit,
      createPostit,
      deleteBoard,
      updatePostit,
      addDrawPoints,
      resetDrawPoints,
    },
  );
}
