import * as actionTypes from "./actionTypes";
import firebaseSetup from "../../firebase-db";
import { axiosTmdb } from "../../axios-tmdb";

export const fillTags = length => {
  return { type: actionTypes.FILL_TAGS, length: length };
};

export const toggleBox = index => {
  return { type: actionTypes.TOGGLE_BOX, index: index };
};

const dispatchUpdateTags = data => {
  return { type: actionTypes.UPDATE_TAGS, data: data };
};

export const updateTags = showId => {
  return (dispatch, getState) => {
    const db = firebaseSetup.firestore();
    db.collection("tags")
      .doc(showId)
      .get()
      .then(resp => {
        let newTags;
        const state = getState().tags;
        if (!resp.exists) {
          newTags = {};
          for (let i in state.tagList) {
            newTags[state.tagList[i]] = +state.tagValues[i];
          }
        } else {
          console.log(state.tagValues);
          newTags = resp.data();
          let keys = Object.keys(newTags);
          for (let i in keys) {
            if (state.tagValues[i]) {
              newTags[keys[i]] = newTags[keys[i]] + 1;
            }
          }
        }
        console.log(newTags);
        db.collection("tags")
          .doc(showId)
          .set(newTags)
          .then(response => {
            console.log("Success.Go to Sleep");
            //this.setState({ showTagModal: false, tags: newTags });
            dispatch(dispatchUpdateTags(newTags));
            dispatch(toggleModal());
          })
          .catch(err => {
            console.log("Error Saving Data");
          });
      })
      .catch(err => {
        console.log("Error Fetching Data");
      });
  };
};

const dispatchResponseMapper = data => {
  return { type: actionTypes.FETCH_DATA, data: data };
};

export const fetchData = showId => {
  return dispatch => {
    let data = { api_key: process.env.REACT_APP_TMDB_KEY };
    axiosTmdb.get("/tv/" + showId, { params: data }).then(response => {
      dispatch(dispatchResponseMapper(response.data));
    });
  };
};

const setTags = tags => {
  return { type: actionTypes.POPULATE_DATA, data: tags };
};

export const populateData = showId => {
  return (dispatch, getState) => {
    const db = firebaseSetup.firestore();
    db.collection("tags")
      .doc(showId)
      .get()
      .then(resp => {
        if (!resp.exists) {
          let emptyTags = {};
          for (let i in getState().tags.tagList) {
            emptyTags[getState().tags.tagList[i]] = 0;
          }
          dispatch(setTags(emptyTags));
          dispatch(fillTags(Object.keys(emptyTags).length));
        } else {
          console.log(Object.keys(resp.data).length);
          dispatch(setTags(resp.data()));
          dispatch(fillTags(Object.keys(resp.data()).length));
        }
        console.log(this.props.tagValues);
      })

      .catch(err => {
        console.log("Error getting document", err);
      });
  };
};

export const toggleModal = () => {
  return { type: actionTypes.TOGGLE_MODAL };
};
