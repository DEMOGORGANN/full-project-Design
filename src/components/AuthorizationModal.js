import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";

import { useFormik } from "formik";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import { signin } from "../actions/userActions";

import {CssTextField} from "../utils/styles";

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

const AuthorizationModal = (props) => {
	const dispatch = useDispatch();

	const [recovery, setRecovery] = useState(false);
	const [reply, setReply] = useState(false);

	const handleClose = () => {
	props.setOpen(false);
	  setReply(false);
	  setRecovery(false);
	};
	const handleRecoveryClick = () => {
	  setRecovery(true);
	};

	const emailRecovery = async (email) => {
		try {
		  //   const { data } = await Axios.post('/api/users/signin', { email});
		//   const data = true;
		  setReply(true);
		} catch (error) {
		  setReply(false);
		}
	  };

	const formikSignin = useFormik({
		initialValues: {
		  signin_email: "",
		  signin_password: "",
		 
		},
		validationSchema: validationSignin,
		onSubmit: (values) => {
		  dispatch(
			signin(
			  values.signin_email,
			  values.signin_password,
			  true
			)
		  );
		  props.setOpen(false);
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

	return (
		<Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
      >
        <Box className="modal modal_checkout">
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

          {!recovery ? (
            <div className="modal__content">
              <div className="modal__title subtitle">Авторизация</div>
              <div className="modal__text">
                Зайдте в свой профиль для быстрого заказа.
              </div>

              <form onSubmit={formikSignin.handleSubmit}>
                <div className="modal__input-block">
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
                <div className="modal__input-block">
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
                <button
                  type="submit"
                  className="button modal__button button_black button_lg"
                >
                  Войти
                </button>
                <div className="modal__link">
                  <span onClick={handleRecoveryClick}>Забыли пароль?</span>
                </div>
              </form>
            </div>
          ) : reply ? (
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
	)
}

export default AuthorizationModal;
