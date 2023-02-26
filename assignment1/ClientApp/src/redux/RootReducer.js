import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./slices/user";
import author from "./slices/author";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "author"],
};

const rootReducer = combineReducers({
  user,
  author,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export default pReducer;
