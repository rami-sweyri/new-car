import {
  READ_USERS,
  READ_ONE_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CLEAR_USER,
  START_USERS_RELOAD,
  FINISHED_USERS_RELOAD,
} from "../types/user";

const initialState = {
  users: [],
  pagination: {},
  user: {},
  error: {},
  loading: false,
  readable: false,
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_USERS:
      return {
        ...state,
        users: payload.data,
        pagination: payload.pagination,
        readable: true,
      };
    case READ_ONE_USER:
      return {
        ...state,
        user: payload.data,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [payload.data, ...state.users],
      };
    case UPDATE_USER:
      console.log({
        updateUserrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr: payload.data,
      });
      return {
        ...state,
        users: [
          ...state.users.map((user) =>
            user.id === payload.data.id ? payload.data : user
          ),
        ],
      };
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((user) => user.id !== payload.data.id)],
      };
    case CLEAR_USER:
      return {
        ...state,
        user: {},
      };
    case START_USERS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_USERS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
