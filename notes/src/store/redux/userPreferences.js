import { createAction } from "@reduxjs/toolkit";
import fakeApi from "../../utils/fakeApi";

export const loadUserPreferences = () => async (dispatch) => {
  dispatch(setDataState("initialized"));

  fakeApi.getPreferredFont().then((preferredFont) => {
    dispatch(setPreferredFont(preferredFont));
  });

  fakeApi.getPreferredColor().then((preferredColor) => {
    dispatch(setPreferredColor(preferredColor));
  });
};

const initialState = {
  dataState: "not-initialized",
  preferredFont: null,
  preferredColor: null,
};

const setDataState = createAction(
  "userPreferences/setDataState",
  (dataState) => {
    return { payload: dataState };
  }
);

const setPreferredFont = createAction(
  "userPreferences/setPreferredFont",
  (preferredFont) => {
    return { payload: preferredFont };
  }
);

const setPreferredColor = createAction(
  "userPreferences/setPreferredColor",
  (preferredColor) => {
    return { payload: preferredColor };
  }
);

const userPreferencesReducer = (userPreferences = initialState, action) => {
  if (action.type === setDataState.toString()) {
    return {
      ...userPreferences,
      dataState: action.payload,
    };
  }

  if (action.type === setPreferredFont.toString()) {
    return {
      ...userPreferences,
      preferredFont: action.payload,
    };
  }

  if (action.type === setPreferredColor.toString()) {
    return {
      ...userPreferences,
      preferredColor: action.payload,
    };
  }

  return userPreferences;
};

export default userPreferencesReducer;
