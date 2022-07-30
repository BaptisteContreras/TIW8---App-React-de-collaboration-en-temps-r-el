import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import boardConnector from '../../redux/connector/boardConnector';
import CreatePostitModal from '../Board/Elements/Postit/Form/CreatePostitModal';
import AppDrawerPostit from '../Header/Drawer/AppDrawerPostit';

function ButtonPostits({
  getCurrentBoard, setCurrentPostit, nextPostit, previousPostit, allVisible,
}) {
  const currentBoard = getCurrentBoard();
  const [statePostit, setStatePostit] = useState({
    modalPostit: false,
  });
  const { modalPostit } = statePostit;

  const [stateListPostit, setStateListPostit] = useState({
    modalListPostit: false,
  });
  const { modalListPostit } = stateListPostit;

  const handleModal = (open) => () => {
    setStatePostit({ modalPostit: open });
  };

  const handleModalListPostit = (open) => () => {
    setStateListPostit({ modalListPostit: open });
  };

  const nextPostitClick = () => {
    const nextId = nextPostit();
    if (nextId) {
      setCurrentPostit(nextId);
    }
  };

  const previousPostitClick = () => {
    const previousId = previousPostit();
    if (previousId) {
      setCurrentPostit(previousId);
    }
  };

  return (
    <>
      <AppDrawerPostit open={modalListPostit} toggle={handleModalListPostit(false)} />
      <BottomNavigationAction
        label="Avant"
        icon={<SkipPreviousIcon />}
        disabled={previousPostit(allVisible) == null}
        onClick={previousPostitClick}
      />
      <BottomNavigationAction
        label="Ajout postit"
        icon={<ListIcon />}
        disabled={currentBoard == null || currentBoard.postits.length === 0}
        onClick={handleModalListPostit(true)}
      />
      <BottomNavigationAction
        label="Ajout postit"
        icon={<AddIcon />}
        disabled={currentBoard == null}
        onClick={handleModal(true)}
      />
      <BottomNavigationAction
        label="Suivant"
        icon={<SkipNextIcon />}
        disabled={nextPostit(allVisible) == null}
        onClick={nextPostitClick}
      />
      <CreatePostitModal
        handleClose={handleModal(false)}
        open={modalPostit}
      />
    </>
  );
}

export default boardConnector()(ButtonPostits);

ButtonPostits.propTypes = {
  setCurrentPostit: PropTypes.func.isRequired,
  nextPostit: PropTypes.func.isRequired,
  getCurrentBoard: PropTypes.func.isRequired,
  previousPostit: PropTypes.func.isRequired,
  allVisible: PropTypes.bool.isRequired,
};
