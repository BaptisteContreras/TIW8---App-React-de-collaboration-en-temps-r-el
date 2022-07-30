import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import PropTypes from 'prop-types';
import DrawerListItemBoard from './DrawerListItemBoard';
import { BoardType } from '../../../types';
import boardConnector from '../../../redux/connector/boardConnector';

function DrawerListBoard({
  toggleDrawer, boards, setCurrentBoard,
}) {
  const useStyles = makeStyles(() => ({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  }));

  const classes = useStyles();

  const setBoard = (item) => () => {
    setCurrentBoard(item.id, null);
  };

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {boards.map((item) => (
          <DrawerListItemBoard key={item.id} item={item} onClick={setBoard(item)} />
        ))}
      </List>
    </div>
  );
}

export default boardConnector()(DrawerListBoard);

DrawerListBoard.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  setCurrentBoard: PropTypes.func.isRequired,
  boards: PropTypes.arrayOf(BoardType).isRequired,
};
