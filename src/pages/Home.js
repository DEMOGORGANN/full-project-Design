import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import Slider from "../components/Slider";
import MainBrand from "../components/MainBrand";
import ButtonArrow from "../components/ButtonArrow";
import Layout from "../components/Layout";
import "swiper/swiper.scss";
import data from "../data";

import { useDispatch, useSelector } from "react-redux";
import { listLabelProducts } from "../actions/productActions";

SwiperCore.use([Pagination]);

const Home = () => {
  const dispatch = useDispatch();
  const productListLabel = useSelector((state) => state.productListLabel);
  const { loading, error, bestsellerProducts, promoProducts} = productListLabel;

  useEffect(() => {
    dispatch(listLabelProducts({
		bestseller: true,
		promo: true
	 }));
  }, [dispatch]);
  return (
    <Layout>
      <main className="main-page page">
        <section className="main-baner">
          <Swiper pagination={true} loop={true} className="main-slider">
            {data.mainSlider.map((slideContent, index) => (
              <SwiperSlide
                key={index}
                className="main-slider__slide bg-img"
                style={{
                  backgroundImage: `url(${
                    process.env.REACT_APP_API_URL + slideContent.img
                  })`,
                }}
              >
                <div className="container">
                  <div className="main-slider__content">
                    <h2 className="main-slider__title">{slideContent.title}</h2>
                    {slideContent.text && (
                      <div className="main-slider__text">
                        {slideContent.text}
                      </div>
                    )}

                    <Link className="main-slider__link" to="/">
                      <ButtonArrow text={" Смотреть"} color={"#ffffff"} />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="main-bestseller">
          <div className="container">
            <h2 className="title main-page__title">Бестселлеры </h2>
          </div>
          {!loading && !error && <Slider dataSlider={bestsellerProducts} />}
        </section>
        <section className="main-catalog">
          {data.mainCatalog.map((item, i) => (
            <div
              key={item.id}
              className="main-catalog__item aspect-ratio bg-img"
              style={{
                backgroundImage: `url(${
                  process.env.REACT_APP_API_URL + item.img
                })`,
              }}
            >
              <div className="aspect-ratio__inside main-catalog__content">
                <h3 className="main-catalog__title">{item.title}</h3>

                <Link
                  className="main-catalog__link"
                  to={`/category/${item.slug}`}
                >
                  <ButtonArrow text={" Смотреть"} color={"#ffffff"} />
                </Link>
              </div>
            </div>
          ))}
        </section>
        <section className="main-promo">
          <div className="container">
            <h2 className="title main-page__title">Акции</h2>
          </div>
          {!loading && !error && <Slider dataSlider={promoProducts} />}
        </section>
        <section className="main-brands">
          <div className="container">
            <h2 className="title main-page__title">Бренды</h2>
          </div>
          <div className="main-brands__content">
            {data.mainBrand.map((item, index) => (
              <MainBrand key={item.id} dataBrand={item} />
            ))}
          </div>
          <div className="main-brands__button-block">
            <Link className="button button_white button_lg" to="/brands">
              Все бренды
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
