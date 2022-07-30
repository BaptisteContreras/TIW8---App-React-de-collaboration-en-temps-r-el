import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { ColorPicker } from 'material-ui-color';
import boardConnector from '../../../../../redux/connector/boardConnector';

function CreateBoardModal({ getCurrentBoard, createPostit, handleClose }) {
  const currentBoard = getCurrentBoard();

  const [state, setState] = useState({
    color: '#000',
    title: null,
    text: null,
  });

  const { color, title, text } = state;

  const submit = (event) => {
    if (text && title) {
      createPostit(currentBoard.id, {
        title,
        text,
        board: currentBoard.id,
        type: 'postit',
        visible: true,
        color,
        drawing: {
          clickX: [],
          clickY: [],
          clickDrag: [],
          paint: false,
        },
      });
      handleClose();
      event.preventDefault();
    }
  };

  const handleChangeTitle = (event) => {
    setState({ ...state, title: event.target.value });
  };

  const handleChangeContent = (event) => {
    setState({ ...state, text: event.target.value });
  };

  const handleChangeColor = (event) => {
    setState({ ...state, color: `#${event.hex}` });
  };

  return (
    <form onSubmit={submit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Titre du postit"
            helperText="Rentrer le titre du postit"
            variant="filled"
            onChange={handleChangeTitle}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contenu du postit"
            helperText="Rentrer le contenu"
            variant="filled"
            onChange={handleChangeContent}
          />
        </Grid>
        <Grid item xs={12}>
          <ColorPicker
            value={color}
            onChange={handleChangeColor}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="outlined">Confirmer</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default boardConnector()(CreateBoardModal);

CreateBoardModal.propTypes = {
  createPostit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  getCurrentBoard: PropTypes.func.isRequired,
};
