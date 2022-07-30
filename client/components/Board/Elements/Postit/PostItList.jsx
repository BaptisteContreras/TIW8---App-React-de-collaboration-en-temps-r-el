import React from 'react';
import PropTypes from 'prop-types';
import { PostitType } from '../../../../types';
import menuConnector from '../../../../redux/connector/menuConnector';
import PostItListDesktop from './PostItListDesktop';
import PostItListMobile from './PostItListMobile';

function PostItList({
  idBoard, postits, getDevice, displayAll,
  configDevice: { enableDraw, enableAction },
}) {
  const device = getDevice();

  const displayContentMobile = () => (
    <PostItListMobile
      displayAll={displayAll}
      enableDraw={enableDraw}
      enableAction={enableAction}
    />
  );

  const displayContentComputer = () => (
    <PostItListDesktop
      idBoard={idBoard}
      postits={postits.filter((e) => e.visible || displayAll)}
      displayAll={displayAll}
      enableDraw={enableDraw}
      enableAction={enableAction}
    />
  );

  return device === 'mobile' ? displayContentMobile() : displayContentComputer();
}

export default menuConnector()(PostItList);

PostItList.propTypes = {
  idBoard: PropTypes.string.isRequired,
  postits: PropTypes.arrayOf(PostitType).isRequired,
  configDevice: PropTypes.shape({
    enableDraw: PropTypes.bool.isRequired,
    enableActon: PropTypes.bool.isRequired,
  }),
  getDevice: PropTypes.func.isRequired,
};
