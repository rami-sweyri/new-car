import {
  READ_ROLES,
  READ_ONE_ROLE,
  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  CLEAR_ROLE,
  START_ROLES_RELOAD,
  FINISHED_ROLES_RELOAD,
} from "../types/roles";

const initialState = {
  roles: [],
  role: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_ROLES:
      return {
        ...state,
        roles: payload.data,
        readable: true,
      };
    case READ_ONE_ROLE:
      return {
        ...state,
        role: payload.data,
      };
    case CREATE_ROLE:
      return {
        ...state,
        roles: [payload.data, ...state.roles],
      };
    case UPDATE_ROLE:
      return {
        ...state,
        roles: [
          ...state.roles.map((role) =>
            role.id === payload.data.role.id ? payload.data.role : role
          ),
        ],
      };
    case DELETE_ROLE:
      return {
        ...state,
        roles: [
          ...state.roles.filter((role) => role.id !== payload.data.role.id),
        ],
      };
    case CLEAR_ROLE:
      return {
        ...state,
        role: {},
      };

    case START_ROLES_RELOAD:
      return {
        ...state,
        loading: true,
      };
    case FINISHED_ROLES_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
