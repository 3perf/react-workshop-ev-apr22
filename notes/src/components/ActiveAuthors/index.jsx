import _ from "lodash";
import { memo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { Avatar, AvatarGroup } from "@mui/material";
import { useSelector } from "react-redux";
import avatar1 from "./avatar1.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.jpg";
// import store from "../../store/redux";

const selectUsersActiveThisMonth = createSelector(
  // INPUTS:
  (state) => state.users,
  // (state) => state.currentMonth,
  // SELECTOR:
  (users /*, currentMonth */) =>
    users.filter((i) => i.lastActiveDate.includes("2022-04"))
);

export default memo(function ActiveAuthors() {
  // ORIGINAL APPROACH:
  // const activeThisMonth = useSelector((state) =>
  //   state.users.filter((i) => i.lastActiveDate.includes("2022-04"))
  // );

  // APPROACH 1: (optimization 4)
  // const activeThisMonthNumber = useSelector(
  //   (state) =>
  //     state.users.filter((i) => i.lastActiveDate.includes("2022-04")).length
  // );
  // const activeThisMonthNames = useSelector((state) =>
  //   state.users
  //     .filter((i) => i.lastActiveDate.includes("2022-04"))
  //     .map((i) => i.name)
  //     .join(", ")
  // );

  // APPROACH 2: (doesn’t work)
  // const allUsers = useSelector((state) => state.users);

  // primitive → number, string, boolean, symbol, null, undefined
  // ===

  // APPROACH 3: (optimization 10 – with immer)
  // const users = useSelector((state) => state.users);
  // const activeThisMonth = users.filter((i) =>
  //   i.lastActiveDate.includes("2022-04")
  // );

  // APPROACH 4: (optimization 6)
  // const activeThisMonth = useSelector(
  //   (state) => state.users.filter((i) => i.lastActiveDate.includes("2022-04")),
  //   // DEFAULT: (a, b) => a === b
  //   (a, b) => _.isEqual(a, b) // → DANGER: could be very expensive
  //   // OR: a[0].id === b[0].id && a[1].id === b[1].id && ...
  //   // OR:
  //   // (a, b) =>
  //   //   a.map((i) => i.name).join(", ") === b.map((i) => i.name).join(", ")
  //   // OR:
  //   // (a, b) => JSON.stringify(a) === JSON.stringify(b)
  //   // → false positive if the order of properties is different
  //   // → discards undefined, functions,
  //   // → doesn’t work with circular references
  // );

  // "John", "Maria", "Bill" → 3
  // "John, Maria", "Bill" → 2

  const activeThisMonth = useSelector(selectUsersActiveThisMonth);

  // const store = useStore()
  // const onClick = () => {
  //   store.getState().users.filter(...)
  // }

  return (
    <div className="primary-pane__authors">
      <div className="primary-pane__authors-last-active">
        {activeThisMonth.length} users active this month:{" "}
        {activeThisMonth.map((i) => (
          <span key={i.id}>{i.name}, </span>
        ))}
      </div>
      <AvatarGroup max={2}>
        <Avatar src={avatar1} />
        <Avatar src={avatar2} />
        <Avatar src={avatar3} />
      </AvatarGroup>
    </div>
  );
});
