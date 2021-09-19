import {
  LOGIN,
  REGISTER,
  USER_LOADED,
  FORGET_PASSWORD,
  LOGOUT,
  GET_SUBSCRIPTIONS,
  START_AUTH_RELOAD,
  FINISHED_AUTH_RELOAD,
} from "../types/auth";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: {},
  error: {},
  loading: false,
  services: [],
  clientID: null,
  info: null,
};
const authReducer = function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER:
      return {
        ...state,
      };
    case LOGIN:
      localStorage.setItem("token", payload.data["x-access-token"]);
      console.log({ payload: payload, state });
      return {
        ...state,
      };
    case USER_LOADED:
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        user: payload.data,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,

        user: {},
      };
    case START_AUTH_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_AUTH_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
