import React, { useState, useEffect } from "react";
import classnames from "classnames";
import parse from "html-react-parser";
import CounterInput from "react-counter-input";
import Slider from "../components/Slider";
import CustomizedAccordions from "../components/Accordion";
import Layout from "../components/Layout";
import AuthorizationModal from "../components/AuthorizationModal";

// import useMediaQuery from "@mui/material/useMediaQuery";
import Breadcrumbs from "../components/Breadcrumbs";

import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import { useParams } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import LoadingBox from "../components/LoadingBox";

const Product = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const dispatch = useDispatch();
  const params = useParams();
  const { id: productId } = params;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    dispatch(addToCart(product, qty));
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Layout>
      <main className="product-page page">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <div className="error-message"> {error} </div>
        ) : (
          <>
            <div className="product">
              <div className="product__section product__imgs">
                {product.imgs.map((item, i) => (
                  <div className="product__img" key={i}>
                    <img
                      className=" contain-center"
                      src={process.env.REACT_APP_API_URL + item}
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <div className="product__section product__content">
                <div className="product__block">
                  <h1 className="product__title title">{product.title}</h1>
                  <div className="product__type">{product.category_title}</div>
                  <div className="product__volume">{product.volume}</div>
                  <div className="product__price price">
                    <span className="price__new">
                      {" "}
                      {product.price_new} грн{" "}
                    </span>
                    {product.price_old && (
                      <span className="price__old">
                        {product.price_old} грн
                      </span>
                    )}
                  </div>
                  <div className="product__info text">
                    {parse(product.info)}
                  </div>
                  <div className="product__counter-block">
                    <div className="product__counter-title">Количество:</div>

                    <div className="product__counter">
                      <CounterInput
                        min={1}
                        count={1}
                        // max={100}
                        onCountChange={(count) => setQty(count)}
                        inputStyle={{
                          border: "1px solid #1A1A1A",
                          fontWeight: 500,
                          fontSize: 18,
                          width: 60,
                          height: 50,
                        }}
                        btnStyle={{
                          fontSize: 18,
                          margin: "0 10px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="product__button-block">
                    <button
                      onClick={addToCartHandler}
                      className="product__button button button_black"
                    >
                      Добавить в корзину
                    </button>
                    <button
                      onClick={userInfo ? handleFavorite : handleOpen}
                      type="button"
                      className={classnames("product__favorite", {
                        active: isFavorite,
                      })}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5614 5.36982L12 6.17141L12.4386 5.36983C12.8153 4.68156 13.447 3.75162 14.3821 3.02839L14.1561 2.73614L14.3821 3.02839C15.349 2.28061 16.4359 1.90625 17.625 1.90625C20.9457 1.90625 23.5 4.61603 23.5 8.32097C23.5 10.2965 22.7138 11.9805 21.2585 13.7366C19.7905 15.508 17.6802 17.3085 15.0808 19.5236L15.4051 19.9042L15.0808 19.5236L15.0804 19.524C14.2012 20.2732 13.2028 21.1241 12.1645 22.0321L12.1644 22.0322C12.1193 22.0717 12.061 22.0938 12 22.0938C11.939 22.0938 11.8808 22.0717 11.8357 22.0322L11.8355 22.032C10.7977 21.1245 9.79947 20.2738 8.92103 19.5252L8.91974 19.5241L8.60352 19.8951L8.91973 19.5241C6.32008 17.3087 4.20968 15.5081 2.74161 13.7366C1.28621 11.9805 0.5 10.2965 0.5 8.32097C0.5 4.61603 3.05431 1.90625 6.375 1.90625C7.56406 1.90625 8.65098 2.28061 9.61788 3.02839L9.91886 2.63922L9.61788 3.02839C10.553 3.75162 11.1847 4.68152 11.5614 5.36982Z"
                          stroke="#1A1A1A"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="product__desc">
                  <CustomizedAccordions
                    classes={{
                      item: "product__desc-item",
                      title: "product__desc-title",
                      content: "product__desc-content text",
                    }}
                    dataAccordions={product.desc}
                  />
                </div>
              </div>
            </div>
            <div className="related-products">
              <div className="container">
                <h2 className="title product-page__title">
                  Сопутствующие товары
                </h2>
              </div>
              <Slider dataSlider={product.related} />
            </div>
            <div className="similar-products">
              <div className="container">
                <h2 className="title product-page__title">Похожие товары</h2>
              </div>
              <Slider dataSlider={product.similar} />
            </div>
            <Breadcrumbs
              arr={[
                {
                  path: `/category/${product.category_slug}`,
                  breadcrumb: `${product.category_title}`,
                },
                {
                  path: "",
                  breadcrumb: `${product.title}`,
                },
              ]}
            />

			<AuthorizationModal open={open} setOpen={setOpen} />

          </>
        )}
      </main>
    </Layout>
  );
};

export default Product;
