import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addFavDispatch = showId => {
  return { type: actionTypes.ADD_FAV, showId };
};

export const addFav = (userId, token, showId, showName, poster) => {
  return (dispatch, getState) => {
    const favList = getState().user.favList;
    if (!favList.includes(showId)) {
      const postData = {
        fields: {
          userid: {
            stringValue: userId === null ? "null" : userId
          },
          showId: {
            stringValue: showId.toString()
          },
          showName: {
            stringValue: showName
          },
          poster: {
            stringValue: poster
          }
        }
      };

      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      axios
        .post(
          "https://firestore.googleapis.com/v1beta1/projects/traction-tv/databases/(default)/documents/favourites/?documentId=" +
            userId +
            showId,
          postData,
          config
        )
        .then(resp => {
          dispatch(addFavDispatch(showId));
        });
    } else {
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      axios.delete(
        "https://firestore.googleapis.com/v1beta1/projects/traction-tv/databases/(default)/documents/favourites/" +
          getState().auth.userId +
          showId,
        config
      );
      dispatch(deleteFav(showId));
    }
  };
};

export const deleteFav = showId => {
  return { type: actionTypes.DELETE_FAV, showId };
};
