const initialState = {
  tagValues: []
};

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILL_TAGS": {
      return { ...state, tagValues: new Array(action.length).fill(false) };
    }
    case "TOGGLE_BOX": {
      let currValue = [...state.tagValues];
      currValue[action.index] = !currValue[action.index];
      return { ...state, tagValues: currValue };
    }
  }
  return state;
};

export default tagReducer;
