import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  token: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP: {
      return { ...state, userId: action.userId, token: action.token };
    }
    case actionTypes.HANDLE_ERR: {
      return { ...state, error: action.error };
    }
  }
  return state;
};

export default authReducer;
