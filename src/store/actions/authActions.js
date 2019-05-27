import * as actionTypes from "./actionTypes";
import axios from "axios";
import { fetchFav } from "./userActions";

export const signUpDispatch = (userId, token) => {
  return { type: actionTypes.SIGN_UP, userId, token };
};

export const dispatchErr = error => {
  return { type: actionTypes.HANDLE_ERR, error };
};

export const signUp = (userId, password, signUpState, history, fromTrue) => {
  return dispatch => {
    if (signUpState) {
      axios
        .post(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAEF4haL9W88EWATZOfPVSpTnVI8sRs-Jw",
          {
            email: userId,
            password: password,
            returnSecureToken: true
          }
        )
        .then(resp => {
          console.log(resp);
          localStorage.setItem("idToken", resp.data.idToken);
          localStorage.setItem("refreshToken", resp.data.refreshToken);
          dispatch(signUpDispatch(resp.data.email, resp.data.idToken));
          dispatch(fetchFav(resp.data.email, resp.data.idToken));
          if (fromTrue.state !== undefined && fromTrue.state !== null) {
            history.goBack();
          }
        })
        .catch(err => {
          dispatch(
            dispatchErr(err.response.data.error.message.split("_").join(" "))
          );
          console.log(err);
        });
    } else {
      axios
        .post(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAEF4haL9W88EWATZOfPVSpTnVI8sRs-Jw",
          {
            email: userId,
            password: password,
            returnSecureToken: true
          }
        )
        .then(resp => {
          console.log(resp);
          localStorage.setItem("idToken", resp.data.idToken);
          localStorage.setItem("refreshToken", resp.data.refreshToken);

          const expiryTime = new Date(
            new Date().getTime() + resp.data.expiresIn * 1000
          );
          localStorage.setItem("expiryDate", expiryTime);
          dispatch(signUpDispatch(resp.data.email, resp.data.idToken));
          dispatch(fetchFav(resp.data.email, resp.data.idToken));
          if (fromTrue.state !== undefined && fromTrue.state !== null) {
            history.goBack();
          }
        })
        .catch(err => {
          dispatch(
            dispatchErr(err.response.data.error.message.split("_").join(" "))
          );
          console.log(err);
        });
    }
  };
};

export const reAuthUser = () => {
  return dispatch => {
    const refreshTime = new Date(localStorage.getItem("expiryDate"));
    const currentDate = new Date();
    if (refreshTime.getTime() > currentDate.getTime()) {
      const idToken = localStorage.getItem("idToken");
      axios
        .post(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyAEF4haL9W88EWATZOfPVSpTnVI8sRs-Jw",
          { idToken: idToken }
        )
        .then(resp => {
          dispatch(signUpDispatch(resp.data.users[0].email, idToken));
          dispatch(fetchFav(resp.data.users[0].email, idToken));
          dispatch(expiryCounter(refreshTime.getTime() - new Date().getTime()));
          //dispatch(expiryCounter(5000));
        });
    } else {
      dispatch(expiryCounter(0));
    }
  };
};

export const expiryCounter = expiryTime => {
  return (dispatch, getState) => {
    setTimeout(() => {
      axios
        .post(
          "https://securetoken.googleapis.com/v1/token?key=AIzaSyAEF4haL9W88EWATZOfPVSpTnVI8sRs-Jw",
          {
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem("refreshToken")
          }
        )
        .then(resp => {
          localStorage.setItem("idToken", resp.data.id_token);
          localStorage.setItem("refreshToken", resp.data.refresh_token);
          const expiryTime = new Date(
            new Date().getTime() + resp.data.expires_in * 1000
          );
          localStorage.setItem("expiryDate", expiryTime);
          dispatch(reAuthUser());
          dispatch(expiryCounter(resp.data.expires_in * 1000));
        });
    }, expiryTime);
  };
};
