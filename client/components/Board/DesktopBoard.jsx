import React from 'react';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import boardConnector from '../../redux/connector/boardConnector';
import PostItListDesktop from './Elements/Postit/PostItListDesktop';

function DesktopBoard({
  getCurrentBoard, displayAll, enableAction, enableDraw,
}) {
  const currentBoard = getCurrentBoard();

  const displayContent = () => {
    if (currentBoard) {
      return (
        <PostItListDesktop
          idBoard={currentBoard.id}
          postits={currentBoard.postits.filter((e) => e.visible || displayAll)}
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
  };

  return (
    <>
      <Grid container spacing={3}>
        {displayContent()}
      </Grid>
    </>
  );
}

export default withRouter(boardConnector()(DesktopBoard));

DesktopBoard.propTypes = {
  getCurrentBoard: PropTypes.func.isRequired,
  displayAll: PropTypes.bool.isRequired,
  enableDraw: PropTypes.bool.isRequired,
  enableAction: PropTypes.bool.isRequired,
};
