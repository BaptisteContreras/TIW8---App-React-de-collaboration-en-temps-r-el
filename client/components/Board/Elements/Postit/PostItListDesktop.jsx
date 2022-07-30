import React from 'react';
import PropTypes from 'prop-types';
import { PostitType } from '../../../../types';
import PostIt from './PostIt';
import boardConnector from '../../../../redux/connector/boardConnector';

function PostItListDesktop({
  idBoard, postits, displayAll, enableAction, enableDraw,
}) {
  const getKey = (index) => `${idBoard}-${index}`;

  return postits.map((item, index) => (
    <PostIt
      key={getKey(index)}
      item={item}
      displayAll={displayAll}
      idBoard={idBoard}
      enableDraw={enableDraw}
      enableAction={enableAction}
    />
  ));
}

export default boardConnector()(PostItListDesktop);

PostItListDesktop.propTypes = {
  idBoard: PropTypes.string.isRequired,
  postits: PropTypes.arrayOf(PostitType).isRequired,
  removePostitBoard: PropTypes.func.isRequired,
  displayAll: PropTypes.bool.isRequired,
  enableDraw: PropTypes.bool.isRequired,
  enableAction: PropTypes.bool.isRequired,
};
