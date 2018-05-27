import { loadAll, create, performProtectedRequest, createOptions } from './entityUtils';
import { started, succeeded, failed } from '../asyncOperations';
import { toObject } from '../utils';
import Modal from './modal';

const inRoom = roomId => `room/${roomId}/exercises`;

const Exercises = {
  key: 'exercises',
  actions: {
    execute: (roomId, exerciseId, source, language) => dispatch => {
      const url = inRoom(roomId) + `/execute/${exerciseId}`;

      const options = createOptions('post', Exercises, 'execute', url, {
        code: source,
        extension: language,
      });

      performProtectedRequest(dispatch, options);
    },

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

    create: (roomId, name, difficulty, reward, description, tags, testCase) => dispatch => {
      create(dispatch, Exercises, inRoom(roomId), {name, difficulty, reward, description, tags, testCase});
    },
  },
  actionNames: {
    execute: 'EXECUTE_EXERCISE',
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
    return {...state, checkResult: undefined};
  case succeeded(Exercises.actionNames.check):
    return {...state, checkResult: action.payload};
  case started(Exercises.actionNames.execute):
    return {...state, executeResult: undefined};
  case succeeded(Exercises.actionNames.execute):
    return {...state, executeResult: action.payload};
  default:
    return state;
  }
};

export default Exercises;
