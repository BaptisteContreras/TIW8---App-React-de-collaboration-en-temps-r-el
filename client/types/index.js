import PropTypes from 'prop-types';

const PostitType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  board: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  drawing: PropTypes.shape({
    clickX: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    clickY: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    clickDrag: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
    paint: PropTypes.bool.isRequired,
  }).isRequired,
});

const BoardType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  postits: PropTypes.arrayOf(PostitType).isRequired,
});

export { PostitType, BoardType };
