import {
  READ_SCHEDULED_WASHES,
  READ_ONE_SCHEDULED_WASH,
  CREATE_SCHEDULED_WASH,
  UPDATE_SCHEDULED_WASH,
  UPDATE_SCHEDULED_WASH_STATUS,
  DELETE_SCHEDULED_WASH,
  CLEAR_SCHEDULED_WASH,
  START_SCHEDULED_WASHES_RELOAD,
  FINISHED_SCHEDULED_WASHES_RELOAD,
} from '../types/scheduledWashes';

const initialState = {
  scheduledWashes: [],
  pagination: {},

  scheduledWash: {},
  error: {},
  loading: false,
  readable: false,
};

export default function scheduledWashesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_SCHEDULED_WASHES:
      return {
        ...state,
        scheduledWashes: payload.data,
        pagination: payload.pagination,
        readable: true,
      };
    case READ_ONE_SCHEDULED_WASH:
      return {
        ...state,
        scheduledWash: payload.data,
      };
    case CREATE_SCHEDULED_WASH:
      return {
        ...state,
        scheduledWashes: [payload.data, ...state.scheduledWashes],
      };
    case UPDATE_SCHEDULED_WASH:
      return {
        ...state,
        scheduledWashes: [
          ...state.scheduledWashes.map(scheduledWash =>
            scheduledWash._id === payload.data._id
              ? payload.data
              : scheduledWash
          ),
        ],
      };

    case UPDATE_SCHEDULED_WASH_STATUS:
      return {
        ...state,
        scheduledWashes: [
          ...state.scheduledWashes.filter(
            scheduledWash => scheduledWash._id !== payload.data._id
          ),
        ],
      };
    case DELETE_SCHEDULED_WASH:
      return {
        ...state,
        scheduledWashes: [
          ...state.scheduledWashes.filter(
            scheduledWash => scheduledWash._id !== payload.data._id
          ),
        ],
      };
    case CLEAR_SCHEDULED_WASH:
      return {
        ...state,
        scheduledWash: {},
      };
    case START_SCHEDULED_WASHES_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_SCHEDULED_WASHES_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
