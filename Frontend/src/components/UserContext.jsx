import React, { useReducer, createContext, useCallback } from "react";

// Create a Context component
export const UserContext = createContext();

// Update logged in user details
const UPDATE_USER = "UPDATE_USER";

// Clear user session
const LOGOUT_USER = "LOGOUT_USER";

// Global user state
const initialState = {
  firstName: localStorage.getItem("firstName") || undefined,
  lastName: localStorage.getItem("lastName") || undefined,
  jsonwebtoken: localStorage.getItem("jsonwebtoken") || undefined,
  loggedIn:
    (localStorage.getItem("jsonwebtoken") &&
      localStorage.getItem("jsonwebtoken") !== "undefined") ||
    false,
  email: localStorage.getItem("email") || undefined,
  avatar: localStorage.getItem("avatar") || undefined,
};

// The reducer that will change the (global) state
const reducer = (state, action) => {
  if (action.type === UPDATE_USER) {
    return {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...action.payload,
    };
  }

  return state;
};

// Create the Provider component
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Declare function to send payload to reducer
  const updateUser = useCallback(
    (payload) => {
      // Set the values in the user's computer
      localStorage.setItem("firstName", payload.firstName);
      localStorage.setItem("lastName", payload.lastName);
      localStorage.setItem("email", payload.email);
      localStorage.setItem("avatar", payload.avatar);
      localStorage.setItem("jsonwebtoken", payload.jsonwebtoken);

      dispatch({
        type: UPDATE_USER,
        payload: payload,
      });
    },
    [dispatch],
  );

  const logoutUser = useCallback(
    (payload) => {
      // Set the values in the user's computer
      localStorage.clear();

      dispatch({
        type: LOGOUT_USER,
        payload: payload,
      });
    },
    [dispatch],
  );

  return (
    <UserContext.Provider
      value={{
        firstName: state.firstName,
        lastName: state.lastName,
        jsonwebtoken: state.jsonwebtoken,
        loggedIn: state.loggedIn,
        avatar: state.avatar,
        email: state.email,
        updateUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
