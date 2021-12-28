import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import data from "../data";
import Line from "../components/Line";
import Layout from "../components/Layout";
import useMediaQuery from "@mui/material/useMediaQuery";
import Breadcrumbs from "../components/Breadcrumbs";

import { useDispatch, useSelector } from "react-redux";
import { listBrands } from "../actions/brandActions";
import LoadingBox from "../components/LoadingBox";

const arr = (
  <svg
    width="65"
    height="25"
    viewBox="0 0 65 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M64.7986 12.1318L54.4861 4.31935C54.2175 4.11588 53.7824 4.11588 53.5139 4.31935C53.2454 4.52281 53.2454 4.8524 53.5139 5.05582L62.6529 11.9793H32.6875C32.3075 11.9793 32 12.2122 32 12.5001C32 12.788 32.3075 13.021 32.6875 13.021H62.6529L53.5139 19.9443C53.2454 20.1478 53.2454 20.4774 53.5139 20.6808C53.6482 20.7825 53.8242 20.8334 54 20.8334C54.1759 20.8334 54.3518 20.7825 54.4861 20.6808L64.7986 12.8683C65.0672 12.6649 65.0672 12.3353 64.7986 12.1318Z"
        fill="#1A1A1A"
      />
    </g>
    <rect y="12" width="35" height="1" rx="0.5" fill="#1A1A1A" />
    <defs>
      <clipPath id="clip0">
        <rect width="33" height="25" fill="white" transform="translate(32)" />
      </clipPath>
    </defs>
  </svg>
);
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

const BrandsItem = (props) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return (
    <div className="brands-item">
      <Link
        to={`/brands/${props.dataBrandsItem.slug}`}
        className="brands-item__img"
      >
        <img
          src={process.env.REACT_APP_API_URL + props.dataBrandsItem.img}
          alt=""
          className="cover-center"
        />
      </Link>
      <div className="brands-item__content">
        <Link
          to={`/brands/${props.dataBrandsItem.slug}`}
          className="brands-item__title"
        >
          {props.dataBrandsItem.title}
        </Link>
        <Link
          to={`/brands/${props.dataBrandsItem.slug}`}
          className="brands-item__arrow"
        >
          {isMobile ? arrMob : arr}
        </Link>
      </div>
    </div>
  );
};

const Brands = () => {
  const dispatch = useDispatch();
  const brandList = useSelector((state) => state.brandList);
  const { loading, error, brandsBlockTop, brandsBlockTmpl } = brandList;

  useEffect(() => {
    dispatch(listBrands());
  }, [dispatch]);

  return (
    <Layout>
      <main className="brands-page page">
        <div className="brands">
          <div className="brands__section">
            <div className="brands__block brands__block_top">
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <div className="error-message"> {error} </div>
              ) : (
                brandsBlockTop.map((item, i) => (
                  <BrandsItem key={item.id} dataBrandsItem={item} />
                ))
              )}
            </div>
          </div>
          <div className="brands__line">
            <Line />
          </div>
          <div className="brands__section">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <div className="error-message"> {error} </div>
            ) : (
              brandsBlockTmpl.map((item, i) => (
                <div key={i} className="brands__block brands__block_tmpl">
                  {item.map((item, i) => (
                    <BrandsItem key={item.id} dataBrandsItem={item} />
                  ))}
                  {item.length >= 3 && item.length <= 5 && (
                    <div className={`brands__wait brands__wait_${item.length}`}>
                      coming soon . . .
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <Breadcrumbs />
      </main>
    </Layout>
  );
};
export default Brands;
