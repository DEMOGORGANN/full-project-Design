import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import AccountNav from "./AccountNav";
import Layout from "../../components/Layout";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

import LoadingBox from "../../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import { useFormik } from "formik";
import * as yup from "yup";

import { CssTextField } from "../../utils/styles";

const validationProfile = yup.object({
  profile_name: yup.string("Enter your name").required("name is required"),
  profile_surname: yup
    .string("Enter your surname")
    .required("surname is required"),
  profile_phone: yup.string("Enter your phone").required("phone is required"),
  profile_email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  profile_region: yup.string("Enter your name").required("name is required"),
  profile_city: yup
    .string("Enter your surname")
    .required("surname is required"),
  profile_department: yup
    .string("Enter your name")
    .required("name is required"),
  profile_address: yup
    .string("Enter your surname")
    .required("surname is required"),
});

const validationPassword = yup.object({
  profile_password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  profile_new_password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Profile = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [profile, setProfile] = useState(true);
  const [password, setPassword] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const handleProfileDataClick = () => {
    setProfile(false);
    setProfileData(true);
  };

  const handleProfileDataCancel = () => {
    setProfile(true);
    setProfileData(false);
  };
  const handlePasswordClick = () => {
    setProfile(false);
    setPassword(true);
  };

  const handlePasswordCancel = () => {
    setProfile(true);
    setPassword(false);
  };

  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user && userInfo) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo.id));
    }
  }, [dispatch, user, userInfo]);

  const formikProfile = useFormik({
    enableReinitialize: true,
    initialValues: {
      profile_name: user ? user.name : "",
      profile_surname: user ? user.surname : "",
      profile_phone: user ? user.phone : "",
      profile_email: user ? user.email : "",
      profile_region: user ? user.region : "",
      profile_city: user ? user.city : "",
      profile_department: user ? user.department : "",
      profile_address: user ? user.address : "",
    },
    validationSchema: validationProfile,
    onSubmit: (values) => {
      dispatch(
        updateUserProfile({
          userId: user.id,
          name: values.profile_name,
          surname: values.profile_surname,
          phone: values.profile_phone,
          email: values.profile_email,
          region: values.profile_region,
          city: values.profile_city,
          department: values.profile_department,
          address: values.profile_address,
        })
      );
      setProfile(true);
      setProfileData(false);
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      profile_password: "",
      profile_new_password: "",
    },
    validationSchema: validationPassword,
    onSubmit: (values) => {
      dispatch(
        updateUserProfile({
          userId: user.id,
          password: values.profile_password,
          new_password: values.profile_new_password,
        })
      );
      setProfile(true);
      setPassword(false);
    },
  });

  return (
    <Layout>
      <main className="account page account-mob">
        {isMobile ? (
          <div className="container">
            <h1 className="account-mob__title title">Данные кабинета</h1>
          </div>
        ) : (
          <AccountNav />
        )}

        <div className="container">
          <div className="account__content">
            {profile && (
              <div className={styles.profile}>
                {isMobile && (
                  <div className="account-mob__button-block">
                    <Link to="/account" className="account-mob__button">
                      <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2106_11676)">
                          <path
                            d="M0.164795 13.8977L8.60229 22.3352C8.82204 22.5549 9.178 22.5549 9.39769 22.3352C9.61743 22.1154 9.61743 21.7595 9.39769 21.5398L1.92037 14.0625L26.4375 14.0625C26.7484 14.0625 27 13.8109 27 13.5C27 13.189 26.7484 12.9375 26.4375 12.9375L1.92037 12.9375L9.39769 5.4602C9.61743 5.24045 9.61743 4.8845 9.39769 4.6648C9.28784 4.55496 9.14388 4.50001 8.99996 4.50001C8.85605 4.50001 8.71214 4.55496 8.60224 4.6648L0.164742 13.1023C-0.0549488 13.322 -0.0549488 13.6779 0.164795 13.8977Z"
                            fill="#1A1A1A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2106_11676">
                            <rect
                              width="27"
                              height="27"
                              fill="white"
                              transform="translate(27 27) rotate(-180)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <span>Назад</span>
                    </Link>
                  </div>
                )}

                {loading ? (
                  <LoadingBox />
                ) : error ? (
                  <div className="error-message"> {error} </div>
                ) : (
                  <>
                    <div className={styles.profile__block1}>
                      <h2 className="account__subtitle subtitle">
                        Основные данные
                      </h2>
                      <div className="account__text-block">
                        Имя: <span>{user.name}</span>
                      </div>
                      <div className="account__text-block">
                        Фамилия: <span>{user.surname}</span>
                      </div>
                      <div className="account__text-block">
                        Телефон: <span>{user.phone}</span>
                      </div>
                      <div className="account__text-block">
                        Email: <span>{user.email}</span>
                      </div>
                    </div>
                    <div className={styles.profile__block2}>
                      <h2 className="account__subtitle subtitle">
                        Адрес доставки
                      </h2>
                      <div className="account__text-block">
                        Область: <span>{user.region}</span>
                      </div>
                      <div className="account__text-block">
                        Город: <span>{user.city}</span>
                      </div>
                      <div className="account__text-block">
                        Отделение НП: <span>{user.department}</span>
                      </div>
                      <div className="account__text-block">
                        Адрес: <span>{user.address}</span>
                      </div>
                    </div>

                    <div className="account__button-block">
                      <button
                        onClick={handleProfileDataClick}
                        type="button"
                        className="button button_black button_lg"
                      >
                        Изменить данные
                      </button>
                      <button
                        onClick={handlePasswordClick}
                        type="button"
                        className="button button_white button_lg"
                      >
                        Сменить пароль
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {password && (
              <div className={styles.password}>
                {isMobile && (
                  <div className="account-mob__button-block">
                    <div
                      onClick={handlePasswordCancel}
                      className="account-mob__button"
                    >
                      <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2106_11676)">
                          <path
                            d="M0.164795 13.8977L8.60229 22.3352C8.82204 22.5549 9.178 22.5549 9.39769 22.3352C9.61743 22.1154 9.61743 21.7595 9.39769 21.5398L1.92037 14.0625L26.4375 14.0625C26.7484 14.0625 27 13.8109 27 13.5C27 13.189 26.7484 12.9375 26.4375 12.9375L1.92037 12.9375L9.39769 5.4602C9.61743 5.24045 9.61743 4.8845 9.39769 4.6648C9.28784 4.55496 9.14388 4.50001 8.99996 4.50001C8.85605 4.50001 8.71214 4.55496 8.60224 4.6648L0.164742 13.1023C-0.0549488 13.322 -0.0549488 13.6779 0.164795 13.8977Z"
                            fill="#1A1A1A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2106_11676">
                            <rect
                              width="27"
                              height="27"
                              fill="white"
                              transform="translate(27 27) rotate(-180)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <span>Назад</span>
                    </div>
                  </div>
                )}
                <form onSubmit={formikPassword.handleSubmit}>
                  <div className={styles.password__block}>
                    <h2 className="account__subtitle subtitle">Смена пароля</h2>
                    <div className="account__input-block">
                      <CssTextField
                        fullWidth
                        id="profile_password"
                        name="profile_password"
                        label="Старый пароль *"
                        variant="standard"
                        value={formikPassword.values.profile_password}
                        onChange={formikPassword.handleChange}
                        error={
                          formikPassword.touched.profile_password &&
                          Boolean(formikPassword.errors.profile_password)
                        }
                        helperText={
                          formikPassword.touched.profile_password &&
                          formikPassword.errors.profile_password
                        }
                      />
                    </div>
                    <div className="account__input-block">
                      <CssTextField
                        fullWidth
                        id="profile_new_password"
                        name="profile_new_password"
                        label="Новый пароль *"
                        variant="standard"
                        value={formikPassword.values.profile_new_password}
                        onChange={formikPassword.handleChange}
                        error={
                          formikPassword.touched.profile_new_password &&
                          Boolean(formikPassword.errors.profile_new_password)
                        }
                        helperText={
                          formikPassword.touched.profile_new_password &&
                          formikPassword.errors.profile_new_password
                        }
                      />
                    </div>
                  </div>
                  <div className="account__button-block">
                    <button
                      type="submit"
                      className="button button_black button_lg"
                    >
                      Сохранить изменения
                    </button>
                    <button
                      onClick={handlePasswordCancel}
                      type="button"
                      className="button button_white button_sm"
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              </div>
            )}

            {profileData && (
              <div className={styles.data}>
                {isMobile && (
                  <div className="account-mob__button-block">
                    <div
                      onClick={handleProfileDataCancel}
                      className="account-mob__button"
                    >
                      <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2106_11676)">
                          <path
                            d="M0.164795 13.8977L8.60229 22.3352C8.82204 22.5549 9.178 22.5549 9.39769 22.3352C9.61743 22.1154 9.61743 21.7595 9.39769 21.5398L1.92037 14.0625L26.4375 14.0625C26.7484 14.0625 27 13.8109 27 13.5C27 13.189 26.7484 12.9375 26.4375 12.9375L1.92037 12.9375L9.39769 5.4602C9.61743 5.24045 9.61743 4.8845 9.39769 4.6648C9.28784 4.55496 9.14388 4.50001 8.99996 4.50001C8.85605 4.50001 8.71214 4.55496 8.60224 4.6648L0.164742 13.1023C-0.0549488 13.322 -0.0549488 13.6779 0.164795 13.8977Z"
                            fill="#1A1A1A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2106_11676">
                            <rect
                              width="27"
                              height="27"
                              fill="white"
                              transform="translate(27 27) rotate(-180)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      <span>Назад</span>
                    </div>
                  </div>
                )}
                <form onSubmit={formikProfile.handleSubmit}>
                  <div className={styles.data__block1}>
                    <h2 className="account__subtitle subtitle">
                      Изменения основных данных
                    </h2>
                    <div className="account__input-block">
                      <CssTextField
                        fullWidth
                        id="profile_name"
                        name="profile_name"
                        label="Имя *"
                        variant="standard"
                        value={formikProfile.values.profile_name}
                        onChange={formikProfile.handleChange}
                        error={
                          formikProfile.touched.profile_name &&
                          Boolean(formikProfile.errors.profile_name)
                        }
                        helperText={
                          formikProfile.touched.profile_name &&
                          formikProfile.errors.profile_name
                        }
                      />
                    </div>
                    <div className="account__input-block">
                      <CssTextField
                        fullWidth
                        id="profile_surname"
                        name="profile_surname"
                        label="Фамилия *"
                        variant="standard"
                        value={formikProfile.values.profile_surname}
                        onChange={formikProfile.handleChange}
                        error={
                          formikProfile.touched.profile_surname &&
                          Boolean(formikProfile.errors.profile_surname)
                        }
                        helperText={
                          formikProfile.touched.profile_surname &&
                          formikProfile.errors.profile_surname
                        }
                      />
                    </div>
                    <div className="account__input-block">
                      <CssTextField
                        fullWidth
                        id="profile_phone"
                        name="profile_phone"
                        label="Телефон *"
                        variant="standard"
                        value={formikProfile.values.profile_phone}
                        onChange={formikProfile.handleChange}
                        error={
                          formikProfile.touched.profile_phone &&
                          Boolean(formikProfile.errors.profile_phone)
                        }
                        helperText={
                          formikProfile.touched.profile_phone &&
                          formikProfile.errors.profile_phone
                        }
                      />
                    </div>
                    <div className="account__input-block">
                      <CssTextField
                        fullWidth
                        id="profile_email"
                        name="profile_email"
                        label="Email *"
                        variant="standard"
                        value={formikProfile.values.profile_email}
                        onChange={formikProfile.handleChange}
                        error={
                          formikProfile.touched.profile_email &&
                          Boolean(formikProfile.errors.profile_email)
                        }
                        helperText={
                          formikProfile.touched.profile_email &&
                          formikProfile.errors.profile_email
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.data__block2}>
                    <h2 className="account__subtitle subtitle">
                      Изменения адреса доставки
                    </h2>
                    <div className="account__input-block">
                      <CssTextField
                        fullWidth
                        id="profile_region"
                        name="profile_region"
                        label="Ваша область *"
                        variant="standard"
                        value={formikProfile.values.profile_region}
                        onChange={formikProfile.handleChange}
                        error={
                          formikProfile.touched.profile_region &&
                          Boolean(formikProfile.errors.profile_region)
                        }
                        helperText={
                          formikProfile.touched.profile_region &&
                          formikProfile.errors.profile_region
                        }
                      />
                    </div>
                    <div className="account__input-block">
                      <CssTextField
                        fullWidth
                        id="profile_city"
                        name="profile_city"
                        label="Город *"
                        variant="standard"
                        value={formikProfile.values.profile_city}
                        onChange={formikProfile.handleChange}
                        error={
                          formikProfile.touched.profile_city &&
                          Boolean(formikProfile.errors.profile_city)
                        }
                        helperText={
                          formikProfile.touched.profile_city &&
                          formikProfile.errors.profile_city
                        }
                      />
                    </div>
                    <div className="account__input-block">
                      <CssTextField
                        fullWidth
                        id="profile_department"
                        name="profile_department"
                        label="Отделение НП *"
                        variant="standard"
                        value={formikProfile.values.profile_department}
                        onChange={formikProfile.handleChange}
                        error={
                          formikProfile.touched.profile_department &&
                          Boolean(formikProfile.errors.profile_department)
                        }
                        helperText={
                          formikProfile.touched.profile_department &&
                          formikProfile.errors.profile_department
                        }
                      />
                    </div>
                    <div className="account__input-block">
                      <CssTextField
                        fullWidth
                        id="profile_address"
                        name="profile_address"
                        label="Адрес *"
                        variant="standard"
                        value={formikProfile.values.profile_address}
                        onChange={formikProfile.handleChange}
                        error={
                          formikProfile.touched.profile_address &&
                          Boolean(formikProfile.errors.profile_address)
                        }
                        helperText={
                          formikProfile.touched.profile_address &&
                          formikProfile.errors.profile_address
                        }
                      />
                    </div>
                  </div>
                  <div className="account__button-block">
                    <button
                      type="submit"
                      className="button button_black button_lg"
                    >
                      Сохранить изменения
                    </button>
                    <button
                      onClick={handleProfileDataCancel}
                      type="button"
                      className="button button_white button_sm"
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              </div>
            )}

            {isMobile && profile && (
              <div className="account-mob__link-block">
                <Link to="/orderhistory" className="account-mob__link">
                  <span>История заказов</span>
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_634_4237)">
                      <path
                        d="M26.8352 13.1023L18.3977 4.66481C18.178 4.44506 17.822 4.44506 17.6023 4.66481C17.3826 4.88455 17.3826 5.24051 17.6023 5.4602L25.0796 12.9375H0.562518C0.251596 12.9375 0 13.1891 0 13.5C0 13.811 0.251596 14.0625 0.562518 14.0625H25.0796L17.6023 21.5398C17.3826 21.7595 17.3826 22.1155 17.6023 22.3352C17.7122 22.445 17.8561 22.5 18 22.5C18.1439 22.5 18.2879 22.445 18.3978 22.3352L26.8353 13.8977C27.0549 13.678 27.0549 13.3221 26.8352 13.1023Z"
                        fill="#1A1A1A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_634_4237">
                        <rect width="27" height="27" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link to="/favorites" className="account-mob__link">
                  <span>Избранные товары</span>
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_634_4237)">
                      <path
                        d="M26.8352 13.1023L18.3977 4.66481C18.178 4.44506 17.822 4.44506 17.6023 4.66481C17.3826 4.88455 17.3826 5.24051 17.6023 5.4602L25.0796 12.9375H0.562518C0.251596 12.9375 0 13.1891 0 13.5C0 13.811 0.251596 14.0625 0.562518 14.0625H25.0796L17.6023 21.5398C17.3826 21.7595 17.3826 22.1155 17.6023 22.3352C17.7122 22.445 17.8561 22.5 18 22.5C18.1439 22.5 18.2879 22.445 18.3978 22.3352L26.8353 13.8977C27.0549 13.678 27.0549 13.3221 26.8352 13.1023Z"
                        fill="#1A1A1A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_634_4237">
                        <rect width="27" height="27" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Profile;
