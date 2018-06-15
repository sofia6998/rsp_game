import { createStore } from "redux";
import allReducers from "./js/reducers";

const store = createStore(allReducers);

export default store;