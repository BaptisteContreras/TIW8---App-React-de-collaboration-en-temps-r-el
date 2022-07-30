import PropTypes from 'prop-types';
import boardConnector from '../../redux/connector/boardConnector';

function TitleHeader({ getCurrentBoard }) {
  const currentBoard = getCurrentBoard();
  return currentBoard ? currentBoard.title : 'TIW 8';
}

export default boardConnector()(TitleHeader);

TitleHeader.propTypes = {
  getCurrentBoard: PropTypes.func.isRequired,
};
