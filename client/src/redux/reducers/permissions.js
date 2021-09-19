import {
  READ_PERMISSIONS,
  READ_ONE_PERMISSION,
  CREATE_PERMISSION,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
  CLEAR_PERMISSION,
  START_PERMISSIONS_RELOAD,
  FINISHED_PERMISSIONS_RELOAD,
} from '../types/permissions';

const initialState = {
  permissions: [],
  permission: {},
  error: {},
  loading: false,
  readable: false,
};

export default function permissionsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_PERMISSIONS:
      return {
        ...state,
        permissions: payload.data,
        readable: true,
      };
    case READ_ONE_PERMISSION:
      return {
        ...state,
        permission: payload.data,
      };
    case CREATE_PERMISSION:
      return {
        ...state,
        permissions: [payload.data, ...state.permissions],
      };
    case UPDATE_PERMISSION:
      return {
        ...state,
        permissions: [
          ...state.permissions.map(permission =>
            permission._id === payload.data.permission.data._id
              ? payload.data.permission.data
              : permission
          ),
        ],
      };
    case DELETE_PERMISSION:
      return {
        ...state,
        permissions: [
          ...state.permissions.filter(
            permission => permission._id !== payload.data._id
          ),
        ],
      };
    case CLEAR_PERMISSION:
      return {
        ...state,
        permission: {},
      };
    case START_PERMISSIONS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_PERMISSIONS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
