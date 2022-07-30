import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Assignment from '@material-ui/icons/Assignment';
import { BoardType } from '../../../types';

export default function DrawerListItemBoard({ item, onClick }) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon><Assignment /></ListItemIcon>
      <ListItemText>
        {item.title}
      </ListItemText>
    </ListItem>
  );
}

DrawerListItemBoard.propTypes = {
  item: BoardType.isRequired,
  onClick: PropTypes.func.isRequired,
};
