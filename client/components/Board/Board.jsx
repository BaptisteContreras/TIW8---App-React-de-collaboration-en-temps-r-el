import React from 'react';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import boardConnector from '../../redux/connector/boardConnector';
import PostItList from './Elements/Postit/PostItList';

function Board({ getCurrentBoard, displayAll }) {
  const currentBoard = getCurrentBoard();

  const displayContent = () => {
    if (currentBoard) {
      return (
        <PostItList
          idBoard={currentBoard.id}
          postits={currentBoard.postits}
          displayAll={displayAll}
        />
      );
    }
    return (
      <>
      </>
    );
  };

  return (
    <Grid container spacing={3}>
      {displayContent()}
    </Grid>
  );
}

export default withRouter(boardConnector()(Board));

Board.propTypes = {
  getCurrentBoard: PropTypes.func.isRequired,
  displayAll: PropTypes.bool.isRequired,
};
