import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import PropTypes from 'prop-types';
import boardConnector from '../../../redux/connector/boardConnector';
import DrawerListItemPostit from './DrawerListItemPostit';

function DrawerListPostit({
  toggleDrawer, getCurrentBoard, displayAll, setCurrentPostit,
}) {
  const currentBoard = getCurrentBoard();

  const useStyles = makeStyles(() => ({
    fullList: {
      width: 'auto',
    },
  }));

  const classes = useStyles();

  const setPostit = (item) => () => {
    setCurrentPostit(item.id);
  };

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {currentBoard.postits.filter((e) => e.visible || displayAll).map((item) => (
          <DrawerListItemPostit key={item.id} item={item} onClick={setPostit(item)} />
        ))}
      </List>
    </div>
  );
}

export default boardConnector()(DrawerListPostit);

DrawerListPostit.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  getCurrentBoard: PropTypes.func.isRequired,
  setCurrentPostit: PropTypes.func.isRequired,
  displayAll: PropTypes.bool.isRequired,
};
