import React from "react";
import ReactDOM from "react-dom/client";

import App from "./shared/App";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";

import ScrollOnTop from "./components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollOnTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
