import dataApi from "../data";

// import Axios from 'axios';
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

export const home = () => async (dispatch) => {
	dispatch({
	  type: HOME_REQUEST,
	});
	try {
	  // const { data } = await Axios.get(`/api/home`);
	  const data =  await dataApi.home;
	  dispatch({ type: HOME_SUCCESS, payload: data });
	} catch (error) {
	  const message =
		error.response && error.response.data.message
		  ? error.response.data.message
		  : error.message;
	  dispatch({ type: HOME_FAIL, payload: message });
	}
  };

export const infoCooperation = () => async (dispatch) => {
	dispatch({
	  type: COOPERATION_REQUEST,
	});
	try {
	  // const { data } = await Axios.get(`/api/products/page`);
	  const data =  await dataApi.cooperation;
	  dispatch({ type: COOPERATION_SUCCESS, payload: data });
	} catch (error) {
	  const message =
		error.response && error.response.data.message
		  ? error.response.data.message
		  : error.message;
	  dispatch({ type: COOPERATION_FAIL, payload: message });
	}
  };
export const infoAbout = () => async (dispatch) => {
	dispatch({
	  type: ABOUT_REQUEST,
	});
	try {
	  // const { data } = await Axios.get(`/api/products/page`);
	  const data =  await dataApi.about;
	  dispatch({ type: ABOUT_SUCCESS, payload: data });
	} catch (error) {
	  const message =
		error.response && error.response.data.message
		  ? error.response.data.message
		  : error.message;
	  dispatch({ type: ABOUT_FAIL, payload: message });
	}
  };

  export const detailsProgram = (programId) => async (dispatch) => {
	dispatch({ type: PROGRAM_DETAILS_REQUEST, });
	try {
	//   const { data } = await Axios.get(`/api/products/${programId}`);
	const data = dataApi.seminar;
	  dispatch({ type: PROGRAM_DETAILS_SUCCESS, payload: data });
	} catch (error) {
	  dispatch({
		type: PROGRAM_DETAILS_FAIL,
		payload:
		  error.response && error.response.data.message
			? error.response.data.message
			: error.message
	  });
	}
  };

  export const news = ({pageNumber = ""}) => async (dispatch) => {
	dispatch({
	  type: NEWS_REQUEST,
	});
	try {
	  // const { data } = await Axios.get(`/api/news?pageNumber=${pageNumber}`);
	  const data =  await dataApi.articles;
	  dispatch({ type: NEWS_SUCCESS, payload: data });
	} catch (error) {
	  const message =
		error.response && error.response.data.message
		  ? error.response.data.message
		  : error.message;
	  dispatch({ type: NEWS_FAIL, payload: message });
	}
  };

  export const postNews = (newsId) => async (dispatch) => {
	dispatch({
	  type: POST_REQUEST,
	});
	try {
	  // const { data } = await Axios.get(`/api/news?${newsId}`);
	  const data =  await dataApi.post;
	  dispatch({ type: POST_SUCCESS, payload: data });
	} catch (error) {
	  const message =
		error.response && error.response.data.message
		  ? error.response.data.message
		  : error.message;
	  dispatch({ type: POST_FAIL, payload: message });
	}
  };

  