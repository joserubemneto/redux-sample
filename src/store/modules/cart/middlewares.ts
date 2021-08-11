import { AxiosResponse } from "axios";
import { all, select, takeLatest, call, put } from "redux-saga/effects";
import { IState } from "../..";
import productsService from "../../../services/products";
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from "./actions";

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

// function*/yield are decorators to async/await

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  // Get state to verify product current quantity
  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity || 0
    );
  });

  // Api call to get produck stock
  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    productsService.getProductStock, // Endpoint function
    product.id // Endpoint function param
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    // dispatch success action to reducer
    yield put(addProductToCartSuccess(product));
  } else {
    // dispatch failure action to reducer
    yield put(addProductToCartFailure(product.id));
  }
}

// Array of actions to be observed by the middleware
export default all([
  takeLatest("ADD_PRODUCT_TO_CART_REQUEST", checkProductStock),
]);
