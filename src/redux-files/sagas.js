import { all } from "redux-saga/effects";
import adminScheduleSagas from "./admin-schedules/saga";

export default function* root() {
  yield all([adminScheduleSagas()]);
}
