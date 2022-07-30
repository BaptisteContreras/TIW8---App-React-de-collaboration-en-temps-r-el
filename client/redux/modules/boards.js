import { v4 as uuidv4 } from 'uuid';

export const CREATE_BOARD = 'tiw8/boards/CREATE_BOARD';
export const LOAD_BOARD = 'tiw8/boards/LOAD_BOARD';
export const DELETE_BOARD = 'tiw8/boards/DELETE_BOARD';
export const SET_CURRENT_BOARD = 'tiw8/boards/SET_CURRENT_BOARD';
export const DELETE_POSTIT = 'tiw8/boards/postits/DELETE_POSTIT';
export const UPDATE_POSTIT = 'tiw8/boards/postits/UPDATE_POSTIT';
export const CREATE_POSTIT = 'tiw8/boards/postits/CREATE_POSTIT';
export const SET_STATE = 'tiw8/boards/SET_STATE';
export const SET_CURRENT_POSTIT = 'tiw8/boards/postits/removePostitBoard';
export const WS_ERROR = 'tiw8/boards/ws/WS_ERROR';

const initialState = {
  boards: [
    {
      type: 'board',
      id: '1',
      notes: '',
      title: 'TIW 8',
      postits: [
        {
          id: '1',
          type: 'postit',
          board: '1',
          title: 'TP 1',
          text: 'Le TP porte sur des rappels de developpement Web',
          visible: false,
          color: '#CCC',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
            paint: false,
          },
        },
        {
          id: '2',
          type: 'postit',
          board: '1',
          title: 'TP 2',
          text: 'Le TP porte sur la creation d\'un outil de presentation HTML',
          visible: true,
          color: '#00E',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
            paint: false,
          },
        },
        {
          id: '3',
          type: 'postit',
          board: '1',
          title: 'TP 3',
          text: 'Le TP 3',
          visible: true,
          color: '#00E',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
            paint: false,
          },
        },
        {
          id: '4',
          type: 'postit',
          board: '1',
          title: 'TP 4',
          text: 'Le TP 4',
          visible: true,
          color: '#0E0',
          drawing: {
            clickX: [],
            clickY: [],
            clickDrag: [],
            paint: false,
          },
        },
      ],
    },
    {
      type: 'board',
      id: '2',
      notes: '',
      title: 'Courses',
      postits: [],
    },
  ],
  board: null,
  postit: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DELETE_BOARD: {
      const postit = state.board === action.payload ? null : state.postit;
      const board = state.board === action.payload ? null : state.board;
      return {
        boards: state.boards.filter((b) => b.id !== action.payload),
        board,
        postit,
      };
    }
    case SET_CURRENT_BOARD: {
      const { board, postit, allDisplay } = action.payload;
      const postits = state.boards.filter((e) => e.id === board)[0]
        .postits.filter((e) => e.visible || allDisplay);

      return {
        ...state,
        board,
        postit: postit || (postits.length ? postits[0].id : null),
      };
    }
    case SET_CURRENT_POSTIT: {
      return {
        ...state,
        postit: action.payload,
      };
    }
    case CREATE_BOARD: {
      return {
        ...state,
        ...{
          boards:
            [
              ...state.boards,
              ...[
                action.payload,
              ],
            ],
        },
      };
    }
    case CREATE_POSTIT: {
      const { idBoard, postit } = action.payload;
      const { postits } = state.boards.filter((e) => e.id === idBoard)[0];

      return {
        ...state,
        ...{
          boards:
            [
              ...state.boards.map((e) => {
                if (e.id === idBoard) {
                  return {
                    ...e,
                    postits: [...postits, ...[postit]],
                  };
                }
                return e;
              }),
            ],
        },
        postit: postit.id,
      };
    }
    case UPDATE_POSTIT: {
      const { idBoard, postit } = action.payload;

      return {
        ...state,
        ...{
          boards:
            [
              ...state.boards.map((e) => {
                if (e.id === idBoard) {
                  return {
                    ...e,
                    postits: e.postits.map((p) => (p.id === postit.id ? postit : p)),
                  };
                }
                return e;
              }),
            ],
        },
      };
    }
    case DELETE_POSTIT: {
      const { payload: { idBoard, idPostit, allDisplay } } = action;
      const postits = state.boards.filter((e) => e.id === idBoard)[0]
        .postits.filter((p) => p.id !== idPostit && (p.visible || allDisplay));

      return {
        ...state,
        ...{
          boards:
            [
              ...state.boards.map((e) => {
                if (e.id === idBoard) {
                  return {
                    ...e,
                    postits,
                  };
                }
                return e;
              }),
            ],
        },
        postit: postits.length ? postits[0].id : null,
      };
    }
    case SET_STATE: {
      return action.payload;
    }
    default:
      return state;
  }
}

export function setCurrentBoard(board, postit) {
  return {
    types: [LOAD_BOARD, SET_CURRENT_BOARD, WS_ERROR],
    socketAction: (io, payload) => new Promise((resolve) => {
      io.emit('SET_BOARD', payload.payload);
      resolve(true);
    }),
    payload: {
      board,
      postit,
    },
  };
}

export function deleteBoard(idBoard) {
  return {
    type: DELETE_BOARD,
    payload: idBoard,
  };
}

export function setCurrentBoardLocal(board, postit, allDisplay) {
  return {
    type: SET_CURRENT_BOARD,
    payload: {
      board,
      postit,
      allDisplay,
    },
  };
}

export function createCurrentBoard(name) {
  return {
    types: [LOAD_BOARD, CREATE_BOARD, WS_ERROR],
    socketAction: (io, payload) => new Promise((resolve) => {
      io.emit('CREATE_BOARD', payload.payload);
      resolve(true);
    }),
    payload: {
      type: 'board',
      title: name,
      id: uuidv4(),
      notes: '',
      postits: [],
    },
  };
}

export function createCurrentBoardLocal(type, title, id, notes, postits) {
  return {
    type: CREATE_BOARD,
    payload: {
      type,
      title,
      id,
      notes,
      postits,
    },
  };
}

export function getCurrentBoard(state) {
  if (!state.boards.board) {
    return null;
  }

  const cBoard = state.boards.boards.filter((el) => el.id === state.boards.board);

  return cBoard.length === 1 ? cBoard[0] : null;
}

export function removePostitBoard(idBoard, idPostit, allDisplay) {
  return {
    types: [LOAD_BOARD, DELETE_POSTIT, WS_ERROR],
    socketAction: (io, payload) => new Promise((resolve) => {
      io.emit('DELETE_POSTIT', payload.payload);
      resolve(true);
    }),
    payload: {
      idBoard,
      idPostit,
      allDisplay,
    },
  };
}

export function removePostitBoardLocal(idBoard, idPostit, allDisplay) {
  return {
    type: DELETE_POSTIT,
    payload: {
      idBoard,
      idPostit,
      allDisplay,
    },
  };
}

export function getCurrentPostit(state) {
  if (!state.boards.board && !state.boards.postit) {
    return null;
  }

  const board = getCurrentBoard(state);

  if (board) {
    return getCurrentBoard(state)
      .postits
      .filter((e) => e.id === state.boards.postit)[0];
  }
  return null;
}

export function setCurrentPostit(id) {
  return {
    types: [LOAD_BOARD, SET_CURRENT_POSTIT, WS_ERROR],
    socketAction: (io, payload) => new Promise((resolve) => {
      io.emit('SET_POSTIT', payload.payload);
      resolve(true);
    }),
    payload: id,
  };
}

export function getAllState(state) {
  return state.boards;
}

export function setAllStateLocal(state) {
  return {
    type: SET_STATE,
    payload: state,
  };
}

export function setCurrentPostitLocal(id) {
  return {
    type: SET_CURRENT_POSTIT,
    payload: id,
  };
}

const changePositionPostit = (state) => (position) => (allVisible) => {
  const board = getCurrentBoard(state);

  if (board) {
    const postit = getCurrentPostit(state);

    const postits = board.postits.filter((e) => e.visible || allVisible);
    if (postit) {
      const currentIndex = postits.map((e) => e.id)
        .indexOf(postit.id);

      const newPosition = postits[currentIndex + position];
      return newPosition ? newPosition.id : null;
    }
  }
  return null;
};

export const nextPostit = (state) => changePositionPostit(state)(1);
export const previousPostit = (state) => changePositionPostit(state)(-1);

export function createPostit(idBoard, postit) {
  return {
    types: [CREATE_POSTIT, WS_ERROR],
    socketAction: (io, payload) => new Promise((resolve) => {
      io.emit('CREATE_POSTIT', payload.payload);
      resolve(true);
    }),
    payload: {
      idBoard,
      postit: Object.assign(postit, { id: uuidv4() }),
    },
  };
}

export function createPostitLocal(idBoard, postit) {
  return {
    type: CREATE_POSTIT,
    payload: {
      idBoard,
      postit,
    },
  };
}

export function updatePostit(idBoard, postit, displayAll) {
  return {
    types: [UPDATE_POSTIT, WS_ERROR],
    socketAction: (io, payload) => new Promise((resolve) => {
      io.emit('UPDATE_POSTIT', payload.payload);
      resolve(true);
    }),
    payload: {
      idBoard,
      postit,
      displayAll,
    },
  };
}

export function updatePostitLocal(idBoard, postit) {
  return {
    type: UPDATE_POSTIT,
    payload: {
      idBoard,
      postit,
    },
  };
}

export function addDrawPoints(postit, idBoard, clickX, clickY, clickDrag, paint) {
  return updatePostit(idBoard, {
    ...postit,
    drawing: {
      clickX: [...postit.drawing.clickX, ...[clickX]],
      clickY: [...postit.drawing.clickY, ...[clickY]],
      clickDrag: [...postit.drawing.clickDrag, ...[clickDrag]],
      paint,
    },
  });
}

export function resetDrawPoints(postit, idBoard) {
  return updatePostit(idBoard, {
    ...postit,
    drawing: {
      clickX: [],
      clickY: [],
      clickDrag: [],
      paint: postit.drawing.paint,
    },
  });
}
