import * as actionTypes from "../actions/actionTypes";

const initialState = {
  favourite: false,
  favList: [],
  favouriteList: []
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
    case actionTypes.FETCH_FAV: {
      const newFavList = action.data.map(
        (item, i) => +item.document.fields.showId.stringValue
      );
      return { ...state, favList: newFavList };
    }
    case actionTypes.SET_FAV: {
      return { ...state, favList: action.data };
    }
  }
  return state;
};

export default userReducer;
