import { combineReducers } from "redux";
import layoutReducer from "./pipelines/layout/reducer";

const rootReducers = combineReducers({ layout: layoutReducer });

export default rootReducers;
