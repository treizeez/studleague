import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { user } from "./reducers/user/userReducer";
import { users } from "./reducers/users/usersReducer";
import { votings } from "./reducers/votings/votingsReducer";
import { theme } from "./reducers/themeReducer";
import { ref } from "./reducers/refsReducer";

const allReducers = combineReducers({ user, users, votings, theme, ref });

export const store = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
