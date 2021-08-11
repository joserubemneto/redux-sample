import { all } from "redux-saga/effects";

import cart from "./cart/middlewares";

export default function* rootMiddleware(): any {
  return yield all([cart]);
}
