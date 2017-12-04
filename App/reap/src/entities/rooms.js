import { load, create } from "./entityUtils";
import { succeeded, started, failed } from "../asyncOperations";
import { toObject } from '../utils';

const Rooms = {
  key: "rooms",
  actions: {
    load: (roomId) => dispatch => {
      load(dispatch, Rooms, `room/${roomId}`, true);
    },
    clear: () => dispatch => {
      dispatch({type: "CLEAR_ROOMS"});
    }
  },
  actionNames: {
    load: "LOAD_ROOM",
  }
};

const initialState = {};

export const reducer = (state = initialState, action) => {
  const { load } = Rooms.actionNames;

  switch (action.type) {
    case started(load):
      return {busy: true};
    case succeeded(load):
      return action.payload;
    case failed(load):
    case "CLEAR_ROOMS":
      return initialState;
    default:
      return state;
  }
}

export default Rooms;
