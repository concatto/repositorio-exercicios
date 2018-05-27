import { loadAll, load, create } from './entityUtils';
import { succeeded, started, failed } from '../asyncOperations';
import { toObject } from '../utils';

const Rooms = {
  key: 'rooms',
  actions: {
    load: roomId => dispatch => {
      load(dispatch, Rooms, `room/${roomId}`, true);
    },
    loadAll: () => dispatch => {
      loadAll(dispatch, Rooms, 'room');
    },
    clear: () => dispatch => {
      dispatch({type: 'CLEAR_ROOMS'});
    },
    create: name => dispatch => {
      create(dispatch, Rooms, 'room', {name});
    },
	getInviteable: roomId => dispatch => {
		load(dispatch, Rooms, `room/${roomId}/teste`);
	},
    
  },
  actionNames: {
    load: 'LOAD_ROOM',
    create: 'CREATE_ROOM',
	teste: 'teste'
  },
};

const initialState = {};

export const reducer = (state = initialState, action) => {
  const { load: loadRoom, teste } = Rooms.actionNames;

  switch (action.type) {
  case started(loadRoom):
    return {busy: true};
  case succeeded(loadRoom):
    return action.payload;
  case succeeded(teste):
	console.log("aqui é o log do teste")
	console.log(action.payload);
	return action.payload;
  case failed(loadRoom):
  case 'CLEAR_ROOMS':
    return initialState;
  default:
    return state;
  }
};

export default Rooms;
