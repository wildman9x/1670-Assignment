import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./slices/user";
import author from "./slices/author";
import genre from "./slices/genre";
import publisher from "./slices/publisher";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "author", "genre", "publisher"],
};

const rootReducer = combineReducers({
  user,
  author,
  genre,
  publisher,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export default pReducer;
