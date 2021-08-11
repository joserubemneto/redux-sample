import { Reducer } from "redux";
import { ActionTypes, ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = state.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          const updatedState = state.items.map((item, index) => {
            if (index === productInCartIndex) {
              return {...item, quantity: item.quantity + 1}
            }
            return item
          })
          state.items = updatedState;
        } else {
          state.items = [...state.items, {
            product,
            quantity: 1,
          }]
        }

        return state;
      }

      case ActionTypes.addProductToCartFailure: {
        state.failedStockCheck = [...state.failedStockCheck, action.payload.productId]
        return state;
      }

      default:
        return state;
  };
};

export default cart;
