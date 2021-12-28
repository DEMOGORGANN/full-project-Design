// import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM_QTY,
} from "../constants/cartConstants";


export const addToCart = (product, qty) => (dispatch, getState) => {

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      title: product.title,
	  slug: product.slug,
      img: product.img,
      price_old: product.price_old,
      price_new: product.price_new,
      volume: product.volume,
      id: product.id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const updateCartItemQty = (productId, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_UPDATE_ITEM_QTY,
    payload: {
      id: productId,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

