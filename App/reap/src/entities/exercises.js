import { loadAll, create, performProtectedRequest, createOptions } from './entityUtils';
import { started, succeeded, failed } from '../asyncOperations';
import { toObject } from '../utils';
import Modal from './modal';

const inRoom = roomId => `room/${roomId}/exercises`;

const Exercises = {
  key: 'exercises',
  actions: {
    check: (roomId, source, language) => dispatch => {
      const url = inRoom(roomId) + '/compile';

      const options = createOptions('post', Exercises, 'check', url, {
        code: source,
        extension: language,
      });

      performProtectedRequest(dispatch, options);
    },

    loadAll: roomId => dispatch => {
      loadAll(dispatch, Exercises, inRoom(roomId));
    },

    create: (roomId, name, difficulty, reward, description) => dispatch => {
      create(dispatch, Exercises, inRoom(roomId), {name, difficulty, reward, description});
    },
  },
  actionNames: {
    check: 'CHECK_EXERCISE',
    loadAll: 'LOAD_EXERCISES',
    create: 'CREATE_EXERCISE',
  },
};

const initialState = {
  data: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case succeeded(Exercises.actionNames.loadAll):
    return {data: toObject(action.payload)};
  case started(Exercises.actionNames.check):
    return {...state, output: undefined};
  case succeeded(Exercises.actionNames.check):
    return {...state, output: action.payload};
  default:
    return state;
  }
};

export default Exercises;
