export default function clientMiddleware(io) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { socketAction, types, ...payload } = action;
    if (!socketAction) {
      return next(action);
    }

    const [LOAD, SUCCESS, FAILURE] = types;
    next({ ...payload, type: LOAD });

    const actionPromise = socketAction(io, payload);
    actionPromise
      .then(() => next({ ...payload, type: SUCCESS }),
        (error) => next({ ...payload, error, type: FAILURE }))
      .catch((error) => {
        // console.error('MIDDLEWARE ERROR:', error);
        next({ ...payload, error, type: FAILURE });
      });

    return actionPromise;
  };
}
