import {
  READ_SERVICES,
  READ_ONE_SERVICE,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  CLEAR_SERVICE,
  START_SERVICES_RELOAD,
  FINISHED_SERVICES_RELOAD,
} from "../types/services";

const initialState = {
  services: [],
  service: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_SERVICES:
      return {
        ...state,
        services: payload.data,
        readable: true,
      };
    case READ_ONE_SERVICE:
      return {
        ...state,
        service: payload.data,
      };
    case CREATE_SERVICE:
      return {
        ...state,
        services: [payload.data, ...state.services],
      };
    case UPDATE_SERVICE:
      return {
        ...state,
        services: [
          ...state.services.map((service) =>
            service._id === payload.data.service.data._id
              ? payload.data.service.data
              : service
          ),
        ],
      };
    case DELETE_SERVICE:
      return {
        ...state,
        services: [
          ...state.services.filter(
            (service) => service._id !== payload.data._id
          ),
        ],
      };
    case CLEAR_SERVICE:
      return {
        ...state,
        service: {},
      };
    case START_SERVICES_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_SERVICES_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
