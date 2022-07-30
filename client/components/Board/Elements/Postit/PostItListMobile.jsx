import React from 'react';
import PropTypes from 'prop-types';
import PostIt from './PostIt';
import boardConnector from '../../../../redux/connector/boardConnector';

function PostItListMobile({
  getCurrentBoard, getCurrentPostit, enableDraw, enableAction,
  displayAll,
}) {
  const currentBoard = getCurrentBoard();
  const currentPostit = getCurrentPostit();

  if (currentPostit) {
    return (
      <PostIt
        item={currentPostit}
        idBoard={currentBoard.id}
        displayAll={displayAll}
        enableDraw={enableDraw}
        enableAction={enableAction}
      />
    );
  }
  return (
    <>
    </>
  );
}

export default boardConnector()(PostItListMobile);

PostItListMobile.propTypes = {
  getCurrentBoard: PropTypes.func.isRequired,
  getCurrentPostit: PropTypes.func.isRequired,
  displayAll: PropTypes.bool.isRequired,
  enableDraw: PropTypes.bool.isRequired,
  enableAction: PropTypes.bool.isRequired,
};
