import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { PostitType } from '../../../../types';
import boardConnector from '../../../../redux/connector/boardConnector';
import recognizer from './Recognizer';

function PostIt({
  item, idBoard, updatePostit, removePostitBoard, displayAll,
  addDrawPoints, resetDrawPoints, setCurrentPostit,
  nextPostit, previousPostit, enableDraw, enableAction,
}) {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
  });
  const classes = useStyles();

  const resetDraw = () => {
    resetDrawPoints(item, idBoard);
  };
  const displayResetDrawButton = () => (enableDraw ? (
    <IconButton title="Effacer dessin" onClick={resetDraw}>
      <ClearIcon />
    </IconButton>
  ) : (<></>));

  const visibilityButton = () => (item.visible ? (
    <IconButton onClick={() => updatePostit(idBoard, {
      ...item,
      visible: false,
    }, displayAll)}
    >
      <VisibilityIcon />
    </IconButton>
  ) : (
    <IconButton onClick={() => updatePostit(idBoard, {
      ...item,
      visible: true,
    }, displayAll)}
    >
      <VisibilityOffIcon />
    </IconButton>
  ));

  const {
    drawing: {
      clickX, clickY, clickDrag, paint,
    },
  } = item;

  const [state, setState] = useState({
    paint,
  });

  const refCanvas = useRef(null);

  const addClick = (x, y, dragging) => {
    addDrawPoints(item, idBoard, x, y, dragging, true);
  };

  const redraw = () => {
    const context = refCanvas.current.getContext('2d');
    const { width } = refCanvas.current.getBoundingClientRect();
    const { height } = refCanvas.current.getBoundingClientRect();

    // Ceci permet d'adapter la taille du contexte de votre canvas à sa taille sur la page
    refCanvas.current.setAttribute('width', width);
    refCanvas.current.setAttribute('height', height);
    context.clearRect(0, 0, context.width, context.height); // Clears the canvas

    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 2;

    for (let i = 0; i < clickX.length; i += 1) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1] * width, clickY[i - 1] * height);
      } else {
        context.moveTo(clickX[i] * width - 1, clickY[i] * height);
      }
      context.lineTo(clickX[i] * width, clickY[i] * height);
      context.closePath();
      context.stroke();
    }
  };

  const pointerDownHandler = (ev) => {
    if (enableDraw) {
      const { width } = refCanvas.current.getBoundingClientRect();
      const { height } = refCanvas.current.getBoundingClientRect();
      const mouseX = ((ev.pageX || ev.changedTouches[0].pageX)
        - refCanvas.current.offsetLeft) / width;
      const mouseY = ((ev.pageY || ev.changedTouches[0].pageY)
        - refCanvas.current.offsetTop) / height;

      updatePostit(idBoard, {
        ...item,
        drawing: {
          ...item.drawing,
          paint: true,
        },
      });
      setState({ paint: true });
      addClick(mouseX, mouseY, false);
      redraw();
    }
  };

  const pointerMoveHandler = (ev) => {
    if (paint && enableDraw) {
      const { width } = refCanvas.current.getBoundingClientRect();
      const { height } = refCanvas.current.getBoundingClientRect();
      addClick(
        ((ev.pageX || ev.changedTouches[0].pageX) - refCanvas.current.offsetLeft) / width,
        ((ev.pageY || ev.changedTouches[0].pageY) - refCanvas.current.offsetTop) / height,
        true,
      );
      redraw();
    }
  };

  const pointerUpEvent = (ev) => {
    if (enableDraw && ev.pointerType !== 'touch') {
      const gestures = clickX
        .map((e, index) => [e, clickY[index]])
        .filter((e) => !Number.isNaN(e[0]) || !Number.isNaN(e[1]));

      const result = recognizer.check(gestures);

      if (result) {
        if (result.name === 'next') {
          const nPostit = nextPostit(displayAll);
          if (nPostit) {
            resetDraw();
            setCurrentPostit(nPostit);
          }
        }
        if (result.name === 'previous') {
          const pPostit = previousPostit(displayAll);
          if (pPostit) {
            resetDraw();
            setCurrentPostit(pPostit);
          }
        }
      }
      updatePostit(idBoard, {
        ...item,
        drawing: {
          ...item.drawing,
          paint: false,
        },
      });
      setState({ paint: false });
    }
  };

  useEffect(() => {
    redraw();

    const preventDefault = (ev) => {
      if (ev.target === refCanvas.current) {
        ev.preventDefault();
      }
    };

    window.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      window.removeEventListener('scroll', preventDefault);
    };
  }, [state, item]);

  const cardAction = () => (enableAction ? (
    <CardActions>
      {displayResetDrawButton()}
      <IconButton onClick={() => removePostitBoard(idBoard, item.id, displayAll)}>
        <DeleteIcon />
      </IconButton>
      {visibilityButton()}
    </CardActions>
  ) : (<></>));

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      style={{
        minHeight: '100%',
        marginTop: '1%',
        paddingBottom: 0,
      }}
    >
      <Card
        className={classes.root}
        variant="outlined"
        style={{
          backgroundColor: item.color,
          minHeight: '100%',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography variant="body2" component="p">
            {item.text}
          </Typography>
          <canvas
            className="stroke"
            ref={refCanvas}
            onPointerDown={pointerDownHandler}
            onPointerMove={pointerMoveHandler}
            onPointerUp={pointerUpEvent}
            onPointerOut={pointerUpEvent}
            onTouchMove={pointerMoveHandler}
            onTouchStart={pointerDownHandler}
            onTouchEnd={pointerUpEvent}
          />
        </CardContent>
        {cardAction()}
      </Card>
    </Grid>
  );
}

export default boardConnector()(PostIt);

PostIt.propTypes = {
  item: PostitType.isRequired,
  idBoard: PropTypes.string.isRequired,
  displayAll: PropTypes.bool.isRequired,
  updatePostit: PropTypes.func.isRequired,
  removePostitBoard: PropTypes.func.isRequired,
  addDrawPoints: PropTypes.func.isRequired,
  resetDrawPoints: PropTypes.func.isRequired,
  previousPostit: PropTypes.func.isRequired,
  nextPostit: PropTypes.func.isRequired,
  setCurrentPostit: PropTypes.func.isRequired,
  enableDraw: PropTypes.bool.isRequired,
  enableAction: PropTypes.bool.isRequired,
};
