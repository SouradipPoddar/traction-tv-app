import * as actionTypes from "../actions/actionTypes";

const initialState = {
  favourite: false,
  favList: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FAV: {
      return { ...state, favList: [...state.favList, action.showId] };
    }
    case actionTypes.DELETE_FAV: {
      const newFavList = state.favList.filter(
        (item, i) => item !== action.showId
      );
      return { ...state, favList: newFavList };
    }
  }
  return state;
};

export default userReducer;
