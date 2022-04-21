import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./modules/user";
import postReducer from "./modules/postSlice";
// import imageReducer from "./modules/image";
// import gridReducer from "./modules/grid";
//import postdetailReducer from "./modules/postdetail";
import { createBrowserHistory } from "history";
import logger from "redux-logger";

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: {
    post: postReducer,

    //postdetail: postdetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
