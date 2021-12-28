// import Axios from 'axios';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import classnames from "classnames";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";


import { useFormik } from "formik";
import * as yup from "yup";

import {CssTextField} from "../utils/styles";

import { useDispatch, useSelector } from "react-redux";
import { signin, register } from "../actions/userActions";

const validationSignin = yup.object({
  signin_email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  signin_password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const validationRecovery = yup.object({
  recovery_email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
const validationRegistration = yup.object({
  registration_name: yup.string("Enter your name").required("name is required"),
  registration_surname: yup
    .string("Enter your surname")
    .required("surname is required"),
  registration_email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  registration_phone: yup
    .string("Enter your phone")
    .required("phone is required"),
  registration_password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  registration_checkbox: yup.boolean().oneOf([true], "Message"),
});


const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(14, 14, 14, 0.7);
  -webkit-tap-highlight-color: transparent;
`;

const Login = () => {
	const [reply, setReply] = useState(false);

  const emailRecovery = async (email) => {
    try {
      //   const { data } = await Axios.post('/api/users/signin', { email});
    //   const data = true;
      setReply(true);
    } catch (error) {
      setReply(false);
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
 
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setReply(false);
  };

  const formikSignin = useFormik({
    initialValues: {
      signin_email: "",
      signin_password: "",
      signin_checkbox: false,
    },
    validationSchema: validationSignin,
    onSubmit: (values) => {
      dispatch(
        signin(
          values.signin_email,
          values.signin_password,
          values.signin_checkbox
        )
      );
    },
  });

  const formikRecovery = useFormik({
    initialValues: {
      recovery_email: "",
    },
    validationSchema: validationRecovery,
    onSubmit: (values) => {
      emailRecovery(values.recovery_email);
    },
  });

  const formikRegistration = useFormik({
    initialValues: {
      registration_name: "",
      registration_surname: "",
      registration_email: "",
      registration_phone: "",
      registration_password: "",
      registration_checkbox: false,
    },
    validationSchema: validationRegistration,
    onSubmit: (values) => {  
      dispatch(
        register(
          values.registration_name,
          values.registration_surname,
          values.registration_email,
          values.registration_phone,
          values.registration_password,
        )
      );
	 
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  return (
    <>
      <Layout>
        <main className="login-page page">
          <div className="container">
            <h1 className="login-page__title title">Вход в аккаунт</h1>
          </div>

          <div className="login">
            <div className="login__section login__section_1">
              <form onSubmit={formikSignin.handleSubmit}>
                <h2 className="login__title subtitle">Вход</h2>
                <div className="login__block login__block_1">
                  <div className="login__input-block">
                    <CssTextField
                      fullWidth
                      id="signin_email"
                      name="signin_email"
                      label="Email *"
                      variant="standard"
                      value={formikSignin.values.signin_email}
                      onChange={formikSignin.handleChange}
                      error={
                        formikSignin.touched.signin_email &&
                        Boolean(formikSignin.errors.signin_email)
                      }
                      helperText={
                        formikSignin.touched.signin_email &&
                        formikSignin.errors.signin_email
                      }
                    />
                  </div>
                  <div className="login__input-block">
                    <CssTextField
                      fullWidth
                      id="signin_password"
                      name="signin_password"
                      label="Пароль *"
                      variant="standard"
                      value={formikSignin.values.signin_password}
                      onChange={formikSignin.handleChange}
                      error={
                        formikSignin.touched.signin_password &&
                        Boolean(formikSignin.errors.signin_password)
                      }
                      helperText={
                        formikSignin.touched.signin_password &&
                        formikSignin.errors.signin_password
                      }
                    />
                  </div>
                </div>
                <div className="login__checkbox-block checkbox-block">
                  <div className="checkbox-custom">
                    <input
                      type="checkbox"
                      name="signin_checkbox"
                      id="signin_checkbox"
                      onChange={formikSignin.handleChange}
                    />
                    <div className="checkbox-custom__checkmark"></div>
                  </div>

                  <label htmlFor="signin_checkbox">Запомнить меня</label>
                </div>
                <button type="submit" className="button button_black button_lg">
                  Войти
                </button>
                {/* <Link to="/profile" className="button button_black button_lg">
                  Войти
                </Link> */}
                <div className="login__link">
                  <span onClick={handleOpen}>Забыли пароль?</span>
                </div>
              </form>
            </div>
            <div className="login__section login__section_2">
              <form onSubmit={formikRegistration.handleSubmit}>
                <h2 className="login__title subtitle">Создать аккаунт</h2>
                <div className="login__block login__block_2">
                  <div className="login__input-block">
                    <CssTextField
                      fullWidth
                      id="registration_name"
                      name="registration_name"
                      label="Имя *"
                      variant="standard"
                      value={formikRegistration.values.registration_name}
                      onChange={formikRegistration.handleChange}
                      error={
                        formikRegistration.touched.registration_name &&
                        Boolean(formikRegistration.errors.registration_name)
                      }
                      helperText={
                        formikRegistration.touched.registration_name &&
                        formikRegistration.errors.registration_name
                      }
                    />
                  </div>
                  <div className="login__input-block">
                    <CssTextField
                      fullWidth
                      id="registration_surname"
                      name="registration_surname"
                      label="Фамилия *"
                      variant="standard"
                      value={formikRegistration.values.registration_surname}
                      onChange={formikRegistration.handleChange}
                      error={
                        formikRegistration.touched.registration_surname &&
                        Boolean(formikRegistration.errors.registration_surname)
                      }
                      helperText={
                        formikRegistration.touched.registration_surname &&
                        formikRegistration.errors.registration_surname
                      }
                    />
                  </div>
                  <div className="login__input-block">
                    <CssTextField
                      fullWidth
                      id="registration_email"
                      name="registration_email"
                      label="Email *"
                      variant="standard"
                      value={formikRegistration.values.registration_email}
                      onChange={formikRegistration.handleChange}
                      error={
                        formikRegistration.touched.registration_email &&
                        Boolean(formikRegistration.errors.registration_email)
                      }
                      helperText={
                        formikRegistration.touched.registration_email &&
                        formikRegistration.errors.registration_email
                      }
                    />
                  </div>
                  <div className="login__input-block">
                    <CssTextField
                      fullWidth
                      id="registration_phone"
                      name="registration_phone"
                      label="Телефон *"
                      variant="standard"
                      value={formikRegistration.values.registration_phone}
                      onChange={formikRegistration.handleChange}
                      error={
                        formikRegistration.touched.registration_phone &&
                        Boolean(formikRegistration.errors.registration_phone)
                      }
                      helperText={
                        formikRegistration.touched.registration_phone &&
                        formikRegistration.errors.registration_phone
                      }
                    />
                  </div>
                  <div className="login__input-block">
                    <CssTextField
                      fullWidth
                      id="registration_password"
                      name="registration_password"
                      label="Пароль *"
                      variant="standard"
                      value={formikRegistration.values.registration_password}
                      onChange={formikRegistration.handleChange}
                      error={
                        formikRegistration.touched.registration_password &&
                        Boolean(formikRegistration.errors.registration_password)
                      }
                      helperText={
                        formikRegistration.touched.registration_password &&
                        formikRegistration.errors.registration_password
                      }
                    />
                  </div>
                </div>

                <div
                  className={classnames(
                    "login__checkbox-block checkbox-block checkbox-error-style",
                    {
                      error:
                        formikRegistration.touched.registration_checkbox &&
                        !formikRegistration.values.registration_checkbox,
                    }
                  )}
                >
                  <div className="checkbox-custom">
                    <input
                      type="checkbox"
                      name="registration_checkbox"
                      id="registration_checkbox"
                      onChange={formikRegistration.handleChange}
                    />
                    <div className="checkbox-custom__checkmark"></div>
                  </div>

                  <span>
                    Регистрируясь, вы соглашаетесь с &nbsp;
                    <Link to="/"> политикой конфиденциальности</Link>
                  </span>
                </div>
                <button type="submit" className="button button_black button_lg">
                  Регистрация
                </button>
              </form>
            </div>
          </div>
        </main>
      </Layout>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
      >
        <Box className="modal modal_login">
          <div onClick={handleClose} className="modal__close">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L9.5 9.5M18 18L9.5 9.5M9.5 9.5L18 1L1 18"
                stroke="#1A1A1A"
                strokeWidth="2"
              />
            </svg>
          </div>

          {reply ? (
            <div className="modal__content-reply">
              <div className="modal__subtitle">
                Мы отправили вам сообщение на электронную почту
              </div>
              <div className="modal__text">
                Проверьте свой почтовый ящик и перейдите по ссылке для
                авторизации на сайте.
              </div>
              <button
                onClick={handleClose}
                type="button"
                className="button modal__button button_black button_lg"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <div className="modal__content">
              <div className="modal__title subtitle">Забыли пароль?</div>
              <div className="modal__text">
                Укажите адрес электронной почты, и мы отправим сообщение с
                информацией о том, как задать другой пароль.
              </div>

              <form onSubmit={formikRecovery.handleSubmit}>
                <div className="modal__input-block">
                  <CssTextField
                    fullWidth
                    id="recovery_email"
                    name="recovery_email"
                    label="Зарегистрированный адрес электронной почты *"
                    variant="standard"
                    value={formikRecovery.values.recovery_email}
                    onChange={formikRecovery.handleChange}
                    error={
                      formikRecovery.touched.recovery_email &&
                      Boolean(formikRecovery.errors.recovery_email)
                    }
                    helperText={
                      formikRecovery.touched.recovery_email &&
                      formikRecovery.errors.recovery_email
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="button modal__button button_black button_lg"
                >
                  Подтвердить
                </button>
              </form>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Login;
