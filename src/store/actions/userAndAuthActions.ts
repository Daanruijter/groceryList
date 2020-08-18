import { TEST_ACTION } from "./userAndAuthTypes";
import { TEST_ACTION2 } from "./userAndAuthTypes";
import { actionInterfaces } from "./actionInterfaces";
import { AppActions } from "./userAndAuthActionTSTypes";

// export interface Testtest {
//   type: typeof TEST_ACTION;
//   type: typeof TEST_ACTION2;
//   test: AuthInterface;
// }

export const test = (data: actionInterfaces): AppActions => {
  return {
    type: TEST_ACTION,
    data: data,
  };
};

export const test2 = (data: actionInterfaces): AppActions => {
  return {
    type: TEST_ACTION2,
    data: data,
  };
};

// import axios from "axios";
// import { returnErrors } from "./errorActions";
// import { fetchFavourites } from "./favouriteActions";

// import {
//   USER_LOADED,
//   USER_LOADING,
//   AUTH_ERROR,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT_SUCCESS,
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   FETCH_CURRENT_USER_REQUEST,
//   FETCH_CURRENT_USER_SUCCESS,
//   FETCH_CURRENT_USER_FAILURE,
//   SEND_USER_TOKEN_FAILURE,
//   SEND_USER_TOKEN_SUCCESS,
// } from "./userTypes";

// //check token and load user/
// export const loadUser = () => (dispatch, getState) => {
//   //user loading
//   dispatch({ type: USER_LOADING });

//   let url = "";

//   if (process.env.NODE_ENV === "development") {
//     url = "http://localhost:5000/login/user";
//   }
//   if (process.env.NODE_ENV === "production") {
//     url = "https://myitinerariestravelapp.herokuapp.com/login/user";
//   }

//   axios
//     .get(url, tokenConfig(getState))
//     .then((res) =>
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data,
//       })
//     )
//     .catch((err) => {
//       dispatch(returnErrors(err.data, err.status));

//       dispatch({
//         type: AUTH_ERROR,
//       });
//     });
// };

// //Register User
// export const register = ({ firstName, lastName, email, password, picture }) => (
//   dispatch
// ) => {
//   //headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   //request body//
//   const body = JSON.stringify({
//     firstName,
//     lastName,
//     email,
//     password,
//     picture,
//   });

//   let url = "";

//   if (process.env.NODE_ENV === "development") {
//     url = "http://localhost:5000/createaccount";
//   }
//   if (process.env.NODE_ENV === "production") {
//     url = "https://myitinerariestravelapp.herokuapp.com/createaccount";
//   }

//   axios
//     .post(url, body, config)

//     .then((res) => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//         payload: res.data,
//       });
//       dispatch(fetchCurrentUser());
//     })

//     .catch((err) => {
//       dispatch(
//         returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
//       );
//       console.log(err.response);
//       dispatch({
//         type: REGISTER_FAIL,
//       });
//     });
// };

// //setup config/headers and token

// export const tokenConfig = (getState) => {
//   //Get token from localStorage
//   const token = getState().auth.token;

//   // Headers;
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//     },
//   };

//   //if token, add to headers
//   if (token) {
//     config.headers["x-auth-token"] = token;
//   }

//   return config;
// };

// //logout user
// export const logout = () => {
//   return {
//     type: LOGOUT_SUCCESS,
//   };
// };

// //login user
// //Register User
// export const login = ({ email, password, firstName, lastName }) => (
//   dispatch
// ) => {
//   //headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({
//     email,
//     password,
//     firstName,
//     lastName,
//   });

//   let url = "";

//   if (process.env.NODE_ENV === "development") {
//     url = "http://localhost:5000/login";
//   }
//   if (process.env.NODE_ENV === "production") {
//     url = "https://myitinerariestravelapp.herokuapp.com/login";
//   }

//   axios
//     .post(url, body, config)

//     .then((res) => {
//       console.log(res);
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: res.data,
//       });
//       dispatch(fetchCurrentUser());
//       dispatch(fetchFavourites());
//     })
//     .catch((err) => {
//       console.log(err.response.data);
//       dispatch(
//         returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
//       );

//       dispatch({
//         type: LOGIN_FAIL,
//       });
//     });
// };

// //fetch data//
// export const fetchCurrentUserRequest = () => {
//   return {
//     type: FETCH_CURRENT_USER_REQUEST,
//   };
// };

// export const fetchCurrentUserSuccess = (currentUser) => {
//   return {
//     type: FETCH_CURRENT_USER_SUCCESS,
//     payload: currentUser,
//   };
// };

// export const fetchCurrentUserFailure = (error) => {
//   return {
//     type: FETCH_CURRENT_USER_FAILURE,
//     payload: error,
//   };
// };

// export const fetchCurrentUser = () => {
//   return (dispatch) => {
//     dispatch(fetchCurrentUserRequest());

//     let url = "";

//     if (process.env.NODE_ENV === "development") {
//       url = "http://localhost:5000/currentuser";
//     }
//     if (process.env.NODE_ENV === "production") {
//       url = "https://myitinerariestravelapp.herokuapp.com/currentuser";
//     }

//     return fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "x-auth-token": localStorage.getItem("token"),
//       },
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         const currentUser = data;
//         // console.log(data);

//         dispatch(fetchCurrentUserSuccess(currentUser));
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         dispatch(fetchCurrentUserFailure(errorMessage));
//       });
//   };
// };

// //Send user token
// export const sendUserToken = () => (dispatch) => {
//   let headers = {
//     "Content-Type": "application/x-www-form-urlencoded",
//     "x-auth-token": localStorage.getItem("token"),
//   };

//   let url = "";

//   if (process.env.NODE_ENV === "development") {
//     url = "http://localhost:5000/currentuser";
//   }
//   if (process.env.NODE_ENV === "production") {
//     url = "https://myitinerariestravelapp.herokuapp.com/currentuser";
//   }

//   axios
//     .post(
//       "https://myitinerariestravelapp.herokuapp.com/currentuser",
//       {},
//       { headers }
//     )
//     .then((res) => {
//       dispatch({
//         type: SEND_USER_TOKEN_SUCCESS,
//         payload: res.data,
//       });
//     })

//     .catch((err) => {
//       dispatch({
//         type: SEND_USER_TOKEN_FAILURE,
//       });

//       console.log(err.response);
//     });
// };
