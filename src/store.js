import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/cartReducers";
import {
  productListReducer,
  productDetailsReducer,
  productListLabelReducer
} from "./reducers/productReducers";
import { categoryListReducer } from "./reducers/categoryReducers";
import { brandListReducer } from "./reducers/brandReducers";
import { catalogDetailsReducer } from "./reducers/catalogReducers";
import { langReducer } from "./reducers/langReducers";

import {
	userRegisterReducer,
	userSigninReducer,
	userDetailsReducer,
	userUpdateProfileReducer
  } from './reducers/userReducers';
import {
	aboutReducer,
	cooperationReducer,
	programDetailsReducer,
	newsListReducer,
	newsPostReducer
  } from './reducers/infoReducers';

  import {
	orderCreateReducer,
	orderMineListReducer,
  } from './reducers/orderReducers';

const initialState = {
	userSignin: {
		userInfo: localStorage.getItem('userInfo')
		  ? JSON.parse(localStorage.getItem('userInfo'))
		  : null,
	  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  lang: {
	currentLang: { id: "ru", title: "RU", link: ""},
  },
};

const reducer = combineReducers({
  lang: langReducer,
  cart: cartReducer,
  productList: productListReducer,
  productListLabel: productListLabelReducer,
  productDetails: productDetailsReducer,
  categoryList: categoryListReducer,
  brandList: brandListReducer,
  catalogDetails: catalogDetailsReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  about: aboutReducer,
  cooperation: cooperationReducer,
  programDetails: programDetailsReducer,
  orderCreate: orderCreateReducer,
  orderMineList: orderMineListReducer,
  newsList: newsListReducer,
  newsPost: newsPostReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
