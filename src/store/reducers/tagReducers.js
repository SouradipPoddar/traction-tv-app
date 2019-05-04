import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tagValues: [],
  data: null,
  tagList: [
    "bingeWorthy",
    "brainStorming",
    "decreasingQuality",
    "fastPaced",
    "funny",
    "goodForCouples",
    "intellectual",
    "miniSeries",
    "mustWatch",
    "shortEpisodes",
    "simplePlot"
  ],
  tags: null,
  showTagModal: false
};

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILL_TAGS: {
      return { ...state, tagValues: new Array(action.length).fill(false) };
    }
    case actionTypes.TOGGLE_BOX: {
      let currValue = [...state.tagValues];
      currValue[action.index] = !currValue[action.index];
      return { ...state, tagValues: currValue };
    }
    case actionTypes.UPDATE_TAGS: {
      return { ...state, tags: action.data };
    }
    case actionTypes.FETCH_DATA: {
      return { ...state, data: action.data };
    }
    case actionTypes.POPULATE_DATA: {
      return { ...state, tags: action.data };
    }
    case actionTypes.TOGGLE_MODAL: {
      return { ...state, showTagModal: !state.showTagModal };
    }
  }
  return state;
};

export default tagReducer;
