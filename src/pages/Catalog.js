import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import parse from "html-react-parser";
import classnames from "classnames";
import ProductList from "../components/ProductList";
import Line from "../components/Line";
import Layout from "../components/Layout";
import useMediaQuery from "@mui/material/useMediaQuery";
import Breadcrumbs from "../components/Breadcrumbs";
import FilterMob from "../components/FilterMob";
import PaginationLink from "../components/PaginationLink";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { detailsCatalog } from "../actions/catalogActions";
import { useParams, useLocation } from "react-router-dom";
import Filter from "../components/Filter";
import LoadingBox from "../components/LoadingBox";

const Catalog = () => {
  const { pageNumber = 1, slug = "" } = useParams();
  const { pathname } = useLocation();
  //   const catalogType = pathname.split("/").filter((x) => x)[0];
  const catalogTypeBrands = pathname.indexOf("/brands") >= 0 ? "brands" : "";
  const catalogTypeCategory =
    pathname.indexOf("/category") >= 0 ? "category" : "";
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages = 8 } = productList;

  const catalogDetails = useSelector((state) => state.catalogDetails);
  const {
    loading: loadingCatalog,
    error: errorCatalog,
    catalog,
  } = catalogDetails;

  const isMobile = useMediaQuery("(max-width: 767px)");

  const [height, setHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    dispatch(
      listProducts({ pageNumber, catalogTypeBrands, catalogTypeCategory, slug })
    );
  }, [dispatch, slug, pageNumber, catalogTypeBrands, catalogTypeCategory]);

  useEffect(() => {
    dispatch(detailsCatalog({ catalogTypeBrands, catalogTypeCategory, slug }));
  }, [dispatch, slug, catalogTypeBrands, catalogTypeCategory]);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [height, loadingCatalog]);

  return (
    <Layout>
      <main className="catalog-page page">
        {loadingCatalog ? (
          <LoadingBox />
        ) : errorCatalog ? (
          <div className="error-message"> {error} </div>
        ) : (
          <>
            <div className="container">
              <h1 className="catalog-page__title title">{catalog.title}</h1>
            </div>

            {isMobile ? (
              <div className="container">
                <div className="filter-mob">
                  <FilterMob dataFilter={catalog.filter} />
                </div>
              </div>
            ) : (
              <Filter dataFilter={catalog.filter} />
            )}
          </>
        )}

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <div className="error-message"> {error} </div>
        ) : (
          <>
            <ProductList
              img={!errorCatalog && !loadingCatalog && catalog.img}
              dataProducts={products}
            />

            <div className="pagination-block pagination-block_catalog">
              <div className="container">
                <div className="pagination-container">
                  <PaginationLink
                    url={`/${catalogTypeBrands}${catalogTypeCategory}/${slug}`}
                    pagesCount={pages}
                    pageCurrent={+pageNumber}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <Line />

        {loadingCatalog ? (
          <LoadingBox />
        ) : errorCatalog ? (
          <div className="error-message"> {error} </div>
        ) : (
          <>
            <div className="catalog-page__seo">
              <div className="container">
                <div className={classnames("seo", { open: expanded })}>
                  <div ref={ref} className="seo__content">
                    {parse(catalog.seo)}
                  </div>

                  {height > 208 && (
                    <div onClick={handleExpandClick} className="seo__button">
                      {expanded ? (
                        <span>Свернуть</span>
                      ) : (
                        <span>Детальнее</span>
                      )}
                      <svg
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
                  )}
                </div>
              </div>
            </div>

            <Breadcrumbs
              arr={[
                {
                  path: "",
                  breadcrumb: `${catalog.title}`,
                },
              ]}
            />
          </>
        )}
      </main>
    </Layout>
  );
};

export default Catalog;
