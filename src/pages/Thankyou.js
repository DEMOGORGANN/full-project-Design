import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import data from "../data";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const arrMob = (
  <svg
    width="27"
    height="19"
    viewBox="0 0 27 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.8352 9.10231L18.3977 0.664808C18.178 0.445064 17.822 0.445064 17.6023 0.664808C17.3826 0.884552 17.3826 1.24051 17.6023 1.4602L25.0796 8.93751H0.562518C0.251596 8.93751 0 9.18911 0 9.50003C0 9.81095 0.251596 10.0625 0.562518 10.0625H25.0796L17.6023 17.5398C17.3826 17.7595 17.3826 18.1155 17.6023 18.3352C17.7122 18.445 17.8561 18.5 18 18.5C18.1439 18.5 18.2879 18.445 18.3978 18.3352L26.8353 9.8977C27.0549 9.67801 27.0549 9.32205 26.8352 9.10231Z"
      fill="#1A1A1A"
    />
  </svg>
);

const Thankyou = () => {
  let dataSoc = data.contacts.soc;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <Layout>
      <main className="thankyou-page page">
        <div className="thankyou">
          <div className="container">
            <div className="thankyou__content">
              <h1 className="thankyou__title title">Оплата прошла успешно!</h1>
              <div className="thankyou__text">
                Спасибо за ваш заказ, мы уже обрабатываем данные для отпрпавки.
                Ожидайте сообщения о доставке в течении 1-3 рабочих дней.
                Вернуться в магазин
              </div>
              <Link
                className="button thankyou__button button_black button_lg"
                to={`/`}
              >
                Вернуться в магазин
              </Link>
            </div>
          </div>
        </div>
        <div className="thankyou__soc">
          <div className="container">
            <h2 className="thankyou-page__title title">
              Следите за нашими обновлениями в социальных сетях
            </h2>
          </div>
          <div className="thankyou__soc-container">
            {dataSoc.map((item, i) => (
              <div key={i} className="thankyou__soc-block">
                <a href={item.link} className="thankyou__soc-img aspect-ratio">
                  <img
                    src={process.env.REACT_APP_API_URL + item.img}
                    alt=""
                    className="aspect-ratio__inside cover-center"
                  />
                </a>
                <div className="thankyou__soc-content">
                  <a href={item.link} className="thankyou__soc-title">
                    {item.name}
                  </a>
                  <a href={item.link} className="thankyou__soc-arrow">
                    {arrMob}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

		<section className="thankyou__bestseller">
          <div className="container">
            <h2 className="title thankyou-page__title">Бестселлеры </h2>
          </div>
          {!loading && <Slider dataSlider={products} />}
        </section>

      </main>
    </Layout>
  );
};

export default Thankyou;
