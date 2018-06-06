import { loadAll, load, create, invite } from './entityUtils';
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
    create: (name, invitations, destinationUrl, tokenKey) => dispatch => {
      create(dispatch, Rooms, 'room', {name, invitations, destinationUrl, tokenKey});
    },
	invite: (data) => dispatch => {
      invite(dispatch, Rooms, `room/inviteAll/${data.roomId}`, data);
	}
  },
  actionNames: {
    load: 'LOAD_ROOM',
    create: 'CREATE_ROOM',
	invite: 'INVITE'
  },
};

const initialState = {};

export const reducer = (state = initialState, action) => {
  const { load: loadRoom, create: createRoom } = Rooms.actionNames;

  switch (action.type) {
  case started(loadRoom):
    return {busy: true};
  case succeeded(loadRoom):
    return action.payload;
  case failed(loadRoom):
  case 'CLEAR_ROOMS':
    return initialState;
  case started(createRoom):
    return {busy: true};
  case succeeded(createRoom):
    return action.payload;            
  default:
    return state;
  }
};

export default Rooms;
