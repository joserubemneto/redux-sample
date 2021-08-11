import { createStore, applyMiddleware } from "redux";
import { ICartState } from "./modules/cart/types";
import rootReducer from "./modules/rootReducer";
import rootMiddleware from "./modules/rootMiddleware";

import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootMiddleware);

export default store;
