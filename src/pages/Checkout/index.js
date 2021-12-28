import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Checkout.module.scss";
import classnames from "classnames";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AuthorizationModal from "../../components/AuthorizationModal";

import { createOrder } from "../../actions/orderActions";
import { detailsUser, register } from "../../actions/userActions";
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";
import {CssTextField} from "../../utils/styles";

const validationCheckout = yup.object({
  checkout_name: yup.string("Enter your name").required("name is required"),
  checkout_surname: yup
    .string("Enter your surname")
    .required("surname is required"),
  checkout_email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  checkout_phone: yup.string("Enter your phone").required("phone is required"),
  checkout_region: yup.string("Enter your name").required("name is required"),
  checkout_city: yup
    .string("Enter your surname")
    .required("surname is required"),
  checkout_department: yup
    .string("Enter your name")
    .required("name is required"),
	checkout_privacy: yup.boolean().oneOf([true], "Message"),
});

const Checkout = () => {
	const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const cart = useSelector((state) => state.cart);

  let itemsPrice = cart.cartItems.reduce((a, c) => a + c.qty * c.price_new, 0);
  let totalPrice = itemsPrice;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success } = orderCreate;

  useEffect(() => {
    if (!user && userInfo) {
      dispatch(detailsUser(userInfo.id));
    }
  }, [dispatch, user, userInfo]);

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
	  navigate(`/thankyou`);
    }
  }, [dispatch, navigate, success]);

  const formikCheckout = useFormik({
    enableReinitialize: true,
    initialValues: {
      checkout_name: user ? user.name : "",
      checkout_surname: user ? user.surname : "",
      checkout_email: user ? user.email : "",
      checkout_phone: user ? user.phone : "",
      checkout_region: user ? user.region : "",
      checkout_city: user ? user.city : "",
      checkout_department: user ? user.department : "",
      checkout_privacy: false,
	  checkout_textarea: "",
	  checkout_delivery: "1",
	  checkout_payment: "1",
	  checkout_register: false,

    },
    validationSchema: validationCheckout,
    onSubmit: (values) => {
      dispatch(createOrder(values));
	  if (values.checkout_register) {
		dispatch(
			register(
			  values.checkout_name,
			  values.checkout_surname,
			  values.checkout_email,
			  values.checkout_phone,
			  values.checkout_password,
			)
		  );
	  }
    },
  });

  return (
    <>
      <Header />
      <main className="checkout-page page">
        <div className="container">
          <h1 className="checkout-page__title title">Оформление заказа</h1>
        </div>
        <form onSubmit={formikCheckout.handleSubmit}>
          <div className="checkout">
            <div className="checkout__content">
              <div className="checkout-info">
                <div className="checkout-info__title">
                  <div className="container">
                    {!userInfo && (
                      <div>
                        <span onClick={handleOpen}>Авторизоваться</span> для
                        быстрого заказа
                      </div>
                    )}
                  </div>
                </div>
                <div className="checkout-info__content">
                  <div className="container">
                    <div className="checkout-info__section checkout-info__section_1">
                      <div className="checkout-info__subtitle">Ваши данные</div>
                      <div className="checkout-info__block">
                        <div className="checkout-info__input-block">
                          <CssTextField
                            fullWidth
                            id="checkout_name"
                            name="checkout_name"
                            label="Имя *"
                            variant="standard"
                            value={formikCheckout.values.checkout_name}
                            onChange={formikCheckout.handleChange}
                            error={
                              formikCheckout.touched.checkout_name &&
                              Boolean(formikCheckout.errors.checkout_name)
                            }
                            helperText={
                              formikCheckout.touched.checkout_name &&
                              formikCheckout.errors.checkout_name
                            }
                          />
                        </div>
                        <div className="checkout-info__input-block">
                          <CssTextField
                            fullWidth
                            id="checkout_surname"
                            name="checkout_surname"
                            label="Фамилия *"
                            variant="standard"
                            value={formikCheckout.values.checkout_surname}
                            onChange={formikCheckout.handleChange}
                            error={
                              formikCheckout.touched.checkout_surname &&
                              Boolean(formikCheckout.errors.checkout_surname)
                            }
                            helperText={
                              formikCheckout.touched.checkout_surname &&
                              formikCheckout.errors.checkout_surname
                            }
                          />
                        </div>
                        <div className="checkout-info__input-block">
                          <CssTextField
                            fullWidth
                            id="checkout_email"
                            name="checkout_email"
                            label="Email *"
                            variant="standard"
                            value={formikCheckout.values.checkout_email}
                            onChange={formikCheckout.handleChange}
                            error={
                              formikCheckout.touched.checkout_email &&
                              Boolean(formikCheckout.errors.checkout_email)
                            }
                            helperText={
                              formikCheckout.touched.checkout_email &&
                              formikCheckout.errors.checkout_email
                            }
                          />
                        </div>
                        <div className="checkout-info__input-block">
                          <CssTextField
                            fullWidth
                            id="checkout_phone"
                            name="checkout_phone"
                            label="Телефон *"
                            variant="standard"
                            value={formikCheckout.values.checkout_phone}
                            onChange={formikCheckout.handleChange}
                            error={
                              formikCheckout.touched.checkout_phone &&
                              Boolean(formikCheckout.errors.checkout_phone)
                            }
                            helperText={
                              formikCheckout.touched.checkout_phone &&
                              formikCheckout.errors.checkout_phone
                            }
                          />
                        </div>
                      </div>

                      {!userInfo && (
                        <div className="checkout-info__checkbox-block checkbox-block">
                          <div className="checkbox-custom">
                            <input
                              type="checkbox"
                              name="checkout_register"
                              id="checkout_register"
							  onChange={formikCheckout.handleChange}
                            />
                            <div className="checkbox-custom__checkmark"></div>
                          </div>

                          <label htmlFor="checkout_register">Зарегистрироваться</label>
                        </div>
                      )}
                    </div>

                    <div className="checkout-info__section checkout-info__section_2">
                      <div className="checkout-info__subtitle">
                        Способ доставки
                      </div>
                      <div className="checkout-info__checkbox-block checkbox-block">
                        <div className="checkbox-custom">
                          <input
                            type="radio"
                            name="checkout_delivery"
                            id="checkout_delivery1"
                            defaultChecked
                            onChange={formikCheckout.handleChange}
							value="1"
                          />
                          <div className="checkbox-custom__checkmark"></div>
                        </div>

                        <label htmlFor="checkout_delivery1">На отделение НП</label>
                      </div>

                      <div className="checkout-info__checkbox-block checkbox-block">
                        <div className="checkbox-custom">
                          <input
                            type="radio"
                            name="checkout_delivery"
                            id="checkout_delivery2"
                            onChange={formikCheckout.handleChange}
							value="2"
                          />
                          <div className="checkbox-custom__checkmark"></div>
                        </div>

                        <label htmlFor="checkout_delivery2">Курьером</label>
                      </div>

                      <div className="checkout-info__block">
                        <div className="checkout-info__input-block">
                          <CssTextField
                            fullWidth
                            id="checkout_region"
                            name="checkout_region"
                            label="Ваша область *"
                            variant="standard"
                            value={formikCheckout.values.checkout_region}
                            onChange={formikCheckout.handleChange}
                            error={
                              formikCheckout.touched.checkout_region &&
                              Boolean(formikCheckout.errors.checkout_region)
                            }
                            helperText={
                              formikCheckout.touched.checkout_region &&
                              formikCheckout.errors.checkout_region
                            }
                          />
                        </div>
                        <div className="checkout-info__input-block">
                          <CssTextField
                            fullWidth
                            id="checkout_city"
                            name="checkout_city"
                            label="Город *"
                            variant="standard"
                            value={formikCheckout.values.checkout_city}
                            onChange={formikCheckout.handleChange}
                            error={
                              formikCheckout.touched.checkout_city &&
                              Boolean(formikCheckout.errors.checkout_city)
                            }
                            helperText={
                              formikCheckout.touched.checkout_city &&
                              formikCheckout.errors.checkout_city
                            }
                          />
                        </div>
                        <div className="checkout-info__input-block">
                          <CssTextField
                            fullWidth
                            id="checkout_department"
                            name="checkout_department"
                            label="Отделение НП *"
                            variant="standard"
                            value={formikCheckout.values.checkout_department}
                            onChange={formikCheckout.handleChange}
                            error={
                              formikCheckout.touched.checkout_department &&
                              Boolean(formikCheckout.errors.checkout_department)
                            }
                            helperText={
                              formikCheckout.touched.checkout_department &&
                              formikCheckout.errors.checkout_department
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="checkout-info__section checkout-info__section_3">
                      <div className="checkout-info__subtitle">
                        Способ оплаты
                      </div>
                      <div className="checkout-info__checkbox-block checkbox-block">
                        <div className="checkbox-custom">
                          <input
                            type="radio"
                            name="checkout_payment"
                            id="checkout_payment1"
                            defaultChecked
                            onChange={formikCheckout.handleChange}
							value="1"
                          />
                          <div className="checkbox-custom__checkmark"></div>
                        </div>

                        <label htmlFor="checkout_payment1">
                          Наличными при получении
                        </label>
                      </div>

                      <div className="checkout-info__checkbox-block checkbox-block">
                        <div className="checkbox-custom">
                          <input
                            type="radio"
                            name="checkout_payment"
                            id="checkout_payment2"
                            onChange={formikCheckout.handleChange}
							value="2"
                          />
                          <div className="checkbox-custom__checkmark"></div>
                        </div>

                        <label htmlFor="checkout_payment2">Оплата картой онлайн</label>
                      </div>

                      <textarea
                        className="checkout-info__textarea textarea"
                        name="checkout_textarea"
                        id="checkout_textarea"
						onChange={formikCheckout.handleChange}
                      ></textarea>

                      <div
                        className={classnames(
                          "checkout-info__checkbox-block  checkbox-block checkbox-error-style",
                          {
                            error:
                              formikCheckout.touched.checkout_privacy &&
                              !formikCheckout.values.checkout_privacy,
                          }
                        )}
                      >
                        <div className="checkbox-custom">
                          <input
                            type="checkbox"
                            name="checkout_privacy"
                            id="checkout_privacy"
                            onChange={formikCheckout.handleChange}
                          />
                          <div className="checkbox-custom__checkmark"></div>
                        </div>

                        <span>
                          Согласен с
                          <Link to="/"> политикой конфиденциальности</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkout-products">
                <div className="checkout-products__title">
                  <div className="container">Содержание заказа</div>
                </div>

                <div className="checkout-products__content">
                  {cart.cartItems.map((item, i) => (
                    <div key={item.id} className={styles.card}>
                      <Link
                        className={styles.card_img}
                        to={`/product/${item.slug}/${item.id}`}
                      >
                        <img
                          className="contain-center"
                          src={process.env.REACT_APP_API_URL + item.img}
                          alt=""
                        />
                      </Link>

                      <div className={styles.card_content}>
                        <div className={styles.card_title}>
                          <Link to={`/product/${item.slug}/${item.id}`}>
                            {item.title}
                          </Link>
                        </div>
                        <div className={styles.card_quantity}>
                          <strong>Количество:</strong>

                          <span>
                            {" "}
                            <span>{item.qty}</span> шт
                          </span>
                        </div>
                        <div className={styles.price}>
                          <strong>Цена:</strong>
                          {item.price_old && (
                            <span className={styles.price_old}>
                              {item.price_old} грн
                            </span>
                          )}
                          <span className={styles.price_new}>
                            {item.price_new} грн
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="checkout-products__total-section">
                    <div className="checkout-products__total-block">
                      <span>Доставка:</span>
                      <span>
                        {" "}
                        <span>0</span> грн
                      </span>
                    </div>
                    <div className="checkout-products__total-block">
                      <span>Итоговая сумма:</span>
                      <span>
                        {" "}
                        <span>{totalPrice}</span> грн
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <button
                type="submit"
                className="button button_black button_lg"
                disabled={cart.cartItems.length === 0}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />

      <AuthorizationModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Checkout;
