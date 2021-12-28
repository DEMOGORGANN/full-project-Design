import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM_QTY,
  CART_EMPTY,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === item.id ? { ...item, qty: item.qty + x.qty } : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_UPDATE_ITEM_QTY:
      const i = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.id === i.id ? { ...x, qty: i.qty } : x
        ),
      };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    
	  case CART_EMPTY:
		return { ...state, cartItems: [] };
    default:
      return state;
  }
};
