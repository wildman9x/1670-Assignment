import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./slices/user";
import author from "./slices/author";
import genre from "./slices/genre";
import publisher from "./slices/publisher";
import book from "./slices/book";
import cart from "./slices/cart";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "author", "genre", "publisher", "book", "cart"],
};

const rootReducer = combineReducers({
  user,
  author,
  genre,
  publisher,
  book,
  cart,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export default pReducer;
