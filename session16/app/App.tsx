import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import Bai3 from "./Bai3";

const App = () => (
  <Provider store={store}>
    <Bai3 />
  </Provider>
);

export default App;
