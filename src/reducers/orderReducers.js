import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_RESET,
	ORDER_MINE_LIST_REQUEST,
	ORDER_MINE_LIST_FAIL,
	ORDER_MINE_LIST_SUCCESS,
  } from '../constants/orderConstants';

  export const orderMineListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
	  case ORDER_MINE_LIST_REQUEST:
		return {...state, loading: true };
	  case ORDER_MINE_LIST_SUCCESS:
		return {...state, loading: false, orders: action.payload };
	  case ORDER_MINE_LIST_FAIL:
		return {...state, loading: false, error: action.payload };
	  default:
		return state;
	}
  };

  export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
	  case ORDER_CREATE_REQUEST:
		return {...state, loading: true };
	  case ORDER_CREATE_SUCCESS:
		return {...state, loading: false, success: true, order: action.payload };
	  case ORDER_CREATE_FAIL:
		return {...state, loading: false, error: action.payload };
	  case ORDER_CREATE_RESET:
		return {};
	  default:
		return state;
	}
  };
  