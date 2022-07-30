import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import boardConnector from '../../redux/connector/boardConnector';
import CreatePostitModal from '../Board/Elements/Postit/Form/CreatePostitModal';

function EditPostitMenu({ getCurrentBoard, show, deleteBoard }) {
  const currentBoard = getCurrentBoard();

  const [state, setState] = useState({
    modal: false,
  });
  const { modal } = state;

  const handleModal = (open) => () => {
    setState({ modal: open });
  };

  const [anchorEl, setAnchorEl] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openModal = () => {
    handleModal(true)();
    handleClose();
  };

  const removeBoard = () => {
    deleteBoard(currentBoard.id);
    handleModal(false)();
  };

  return show === true && currentBoard != null ? (
    <div>
      <CreatePostitModal handleClose={handleModal(false)} open={modal} />
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Edition
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={removeBoard}
        >
          Supprimer ce board
        </MenuItem>
        <MenuItem
          onClick={openModal}
        >
          Ajouter un postit

        </MenuItem>
      </Menu>
    </div>
  ) : (<></>);
}

export default boardConnector()(EditPostitMenu);

EditPostitMenu.propTypes = {
  show: PropTypes.bool.isRequired,
  getCurrentBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
};
