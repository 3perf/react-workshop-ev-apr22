import { createAction } from "@reduxjs/toolkit";
import produce from "immer";

export const updateLastActiveDate = createAction(
  "notes/updateLastActiveDate",
  (dateString) => {
    return {
      payload: {
        dateString,
      },
    };
  }
);

const userReducer = (userData = [], action) => {
  if (action.type === updateLastActiveDate.toString()) {
    // WITHOUT IMMER:
    // const [currentUser, ...otherUsers] = userData;

    // if (currentUser.lastActiveDate === action.payload.dateString)
    //   return userData;

    // return [
    //   {
    //     ...currentUser,
    //     lastActiveDate: action.payload.dateString,
    //   },
    //   ...otherUsers,
    // ];

    // WITH IMMER:
    return produce(userData, (draft) => {
      draft[0].lastActiveDate = action.payload.dateString;
    });
  }

  return userData;
};

export default userReducer;
