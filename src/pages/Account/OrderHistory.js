import React, { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import { Link } from "react-router-dom";
import styles from "./OrderHistory.module.scss";
import classnames from "classnames";
import Collapse from "@mui/material/Collapse";
import Layout from "../../components/Layout";
import useMediaQuery from "@mui/material/useMediaQuery";

import { listOrderMine } from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";

const Order = (props) => {
  let dataOrder = props.order;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className={styles.order}>
      <div className="container">
        <div className={styles.block}>
          <div className={styles.id}>№{dataOrder.id}</div>
          <div className={styles.date}>{dataOrder.date}</div>
        </div>
        <div className={styles.status}>{dataOrder.status}</div>
        <div className={styles.total}>
          Общая сумма:
          <span>
            <span>
              {" "}
              {dataOrder.products.reduce(
                (a, c) => a + c.price_new * c.qty,
                0
              )}{" "}
            </span>{" "}
            грн
          </span>
        </div>
        {dataOrder.products.map((item, i) => (
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
              <div className={styles.card_quantity}>{item.qty} шт.</div>
              <div className={styles.price}>
                <span className={styles.price_new}> {item.price_new} грн</span>
                {item.price_old && (
                  <span className={styles.price_old}>{item.price_old} грн</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className={styles.info}>
          <div onClick={handleExpandClick} className={styles.info_button}>
            {expanded ? <span>Свернуть</span> : <span>Детальнее</span>}
            <svg
              className={classnames({ [styles.arr_rotate]: expanded })}
              width="19"
              height="27"
              viewBox="0 0 19 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.89769 26.8352L18.3352 18.3977C18.5549 18.178 18.5549 17.822 18.3352 17.6023C18.1154 17.3826 17.7595 17.3826 17.5398 17.6023L10.0625 25.0796L10.0625 0.562518C10.0625 0.251596 9.81089 0 9.49997 0C9.18905 0 8.93745 0.251596 8.93745 0.562518L8.93745 25.0796L1.4602 17.6023C1.24045 17.3826 0.884497 17.3826 0.664804 17.6023C0.554958 17.7122 0.50001 17.8561 0.50001 18C0.50001 18.1439 0.554958 18.2879 0.664804 18.3978L9.1023 26.8353C9.32199 27.0549 9.67795 27.0549 9.89769 26.8352Z"
                fill="#222222"
              />
            </svg>
          </div>
          <Collapse in={expanded}>
            <div className={styles.info_title}>Информация о заказе</div>
            <div className={styles.list}>
              <div className={styles.block1}>
                <div className={styles.item}>
                  ФИО: <span>{dataOrder.name}</span>
                </div>
                <div className={styles.item}>
                  Телефон: <span>{dataOrder.phone}</span>
                </div>
                <div className={styles.item}>
                  Оплата:<span>{dataOrder.payment}</span>
                </div>
              </div>
              <div className={styles.block2}>
                <div className={styles.item}>
                  Доставка:<span>{dataOrder.delivery}</span>
                </div>
                <div className={styles.item}>
                  Отделение НП:<span>{dataOrder.department}</span>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

const OrderHistory = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <Layout>
      <main className="account page">
        {isMobile ? (
          <div className="container">
            <h1 className="account-mob__title title">История заказов</h1>

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
          </div>
        ) : (
          <AccountNav />
        )}

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <div className="error-message"> {error} </div>
        ) : (
          <div className="account__content">
            <div className={styles.orders}>
              {orders.length === 0 ? (
                <div className="container">
                  <div className={styles.text}>Количество Ваших заказов: 0</div>
                </div>
              ) : (
                <>
                  {orders.map((item, i) => (
                    <Order key={item.id} order={item} />
                  ))}
                </>
              )}
            </div>
            <div className="container">
              <div className={styles.button_block}>
                <div className={styles.button_wrap}>
                  <Link to="/" className="button button_black button_lg">
                    Перейти к покупкам
                  </Link>
                </div>

                {isMobile && (
                  <div className="account-mob__link-block">
                    <Link to="/profile" className="account-mob__link">
                      <span>Данные кабинета</span>
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
          </div>
        )}
      </main>
    </Layout>
  );
};

export default OrderHistory;
