import {
  USERNAME_REQUEST, USERNAME_SUCCESS, USERNAME_FAILURE
} from '../actions';

const initialState = {
  response: {},
  isFetching: false,
  failed: false,
  username: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USERNAME_REQUEST:
      return {
        ...state,
        isFetching: true,
        failed: false,
        response: {},
      };
    case USERNAME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        username: action.payload.login,
      };
    case USERNAME_FAILURE:
      return {
        ...state,
        isFetching: false,
        failed: true,
        response: action.payload,
      };
    default:
      return state;
  }
};
