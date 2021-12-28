import {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAIL,
  COOPERATION_REQUEST,
  COOPERATION_SUCCESS,
  COOPERATION_FAIL,
  ABOUT_REQUEST,
  ABOUT_SUCCESS,
  ABOUT_FAIL,
  NEWS_REQUEST,
  NEWS_SUCCESS,
  NEWS_FAIL,
 POST_REQUEST,
  POST_SUCCESS,
  POST_FAIL,
  PROGRAM_DETAILS_FAIL,
  PROGRAM_DETAILS_REQUEST,
  PROGRAM_DETAILS_SUCCESS,
} from "../constants/infoConstants";

export const aboutReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ABOUT_REQUEST:
      return { ...state, loading: true };
    case ABOUT_SUCCESS:
      return { ...state, loading: false, about: action.payload };
    case ABOUT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cooperationReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case COOPERATION_REQUEST:
      return { ...state, loading: true };
    case COOPERATION_SUCCESS:
      return { ...state, loading: false, cooperation: action.payload };
    case COOPERATION_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const programDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PROGRAM_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PROGRAM_DETAILS_SUCCESS:
      return { ...state, loading: false, program: action.payload };
    case PROGRAM_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newsListReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	  case  NEWS_REQUEST:
		return { ...state, loading: true };
	  case  NEWS_SUCCESS:
		return { ...state, loading: false, articles: action.payload };
	  case  NEWS_FAIL:
		return { ...state, loading: false, error: action.payload };
	  default:
		return state;
	}
  };
export const newsPostReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	  case  POST_REQUEST:
		return { ...state, loading: true };
	  case  POST_SUCCESS:
		return { ...state, loading: false, post: action.payload };
	  case  POST_FAIL:
		return { ...state, loading: false, error: action.payload };
	  default:
		return state;
	}
  };
