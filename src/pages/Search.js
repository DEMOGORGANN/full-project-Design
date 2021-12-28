import React, { useEffect } from "react";
import ProductList from "../components/ProductList";
import Line from "../components/Line";
import Layout from "../components/Layout";
import useMediaQuery from "@mui/material/useMediaQuery";
// import Breadcrumbs from "../components/Breadcrumbs";
import FilterMob from "../components/FilterMob";
import PaginationLink from "../components/PaginationLink";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { detailsCatalog } from "../actions/catalogActions";
import { useParams, useLocation } from "react-router-dom";
import Filter from "../components/Filter";
import LoadingBox from "../components/LoadingBox";

const Search = () => {
  const { pageNumber = 1, slug = "" } = useParams();
  const { pathname } = useLocation();
  const catalogType = pathname.split("/").filter((x) => x)[0];
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

  useEffect(() => {
    dispatch(listProducts({ pageNumber, catalogType, catalogSlug: slug }));
  }, [dispatch, slug, pageNumber, catalogType]);

  useEffect(() => {
    dispatch(detailsCatalog({ catalogType, catalogSlug: slug }));
  }, [dispatch, slug, catalogType]);

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
            <ProductList dataProducts={products} />

            <div className="pagination-block pagination-block_catalog">
              <div className="container">
                <div className="pagination-container">
                  <PaginationLink
                    url={`${catalogType}/${slug}`}
                    pagesCount={pages}
                    pageCurrent={+pageNumber}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <Line />

        {/* <Breadcrumbs /> */}
      </main>
    </Layout>
  );
};

export default Search;
