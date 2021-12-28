import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LABEL_LIST_FAIL,
  PRODUCT_LABEL_LIST_REQUEST,
  PRODUCT_LABEL_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
		...state,
        loading: false,
        products: action.payload,
        //   pages: action.payload.pages,
        //   page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListLabelReducer = (
  state = { loading: true, bestsellerProducts: [], promoProducts: []},
  action
) => {
  switch (action.type) {
    case PRODUCT_LABEL_LIST_REQUEST:
      return {...state, loading: true };
    case PRODUCT_LABEL_LIST_SUCCESS:
      return {
		...state,
        loading: false,
        bestsellerProducts: action.payload,
        promoProducts: action.payload,
        
      };
    case PRODUCT_LABEL_LIST_FAIL:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	  case PRODUCT_DETAILS_REQUEST:
		return { ...state, loading: true };
	  case PRODUCT_DETAILS_SUCCESS:
		return {...state, loading: false, product: action.payload };
	  case PRODUCT_DETAILS_FAIL:
		return {...state, loading: false, error: action.payload };
	  default:
		return state;
	}
  };

