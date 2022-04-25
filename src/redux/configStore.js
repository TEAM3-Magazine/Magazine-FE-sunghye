import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";
import postReducer from "./modules/postSlice";
import imageReducer from "./modules/imageSlice";
import logger from "redux-logger";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    image: imageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }),
});
