import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import boardConnector from '../../../redux/connector/boardConnector';

function CreateBoardModal({ createCurrentBoard, handleClose }) {
  let value;

  const submit = (event) => {
    if (value) {
      createCurrentBoard(value);
      handleClose();
      event.preventDefault();
    }
  };

  const handleChange = (event) => {
    value = event.target.value;
  };

  return (
    <form onSubmit={submit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Nom du board"
            helperText="Rentrer un nom de board"
            variant="filled"
            onChange={handleChange}
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
  createCurrentBoard: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
