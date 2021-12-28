import React, { useEffect } from "react";
import TitleBlock from "./TitleBlock";
import Article from "./Article";
import Layout from "../../components/Layout";
import useMediaQuery from "@mui/material/useMediaQuery";
import Breadcrumbs from "../../components/Breadcrumbs";
import PaginationLink from "../../components/PaginationLink";
import LoadingBox from "../../components/LoadingBox";
import { useParams } from "react-router-dom";

import { news } from "../../actions/infoActions";
import { useDispatch, useSelector } from "react-redux";

const News = () => {

  const { pageNumber = 1 } = useParams();
 
  const newsList = useSelector((state) => state.newsList);
  const { loading, error, articles, pages = 8 } = newsList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(news({ pageNumber }));
  }, [dispatch, pageNumber]);

  const isMobile = useMediaQuery("(max-width: 767px)");
  
  return (
    <Layout>
      <main className="news-page page">
        {loading ? (
          <LoadingBox />
        )  : error ? (
			<div className="error-message"> {error} </div>
		  ) : (
            <div className="news">
              <div className="container">
                <h1 className="title news__title">Новости</h1>
              </div>
              {!isMobile && (
                <TitleBlock
                  img={articles.articles_last.img}
                  date={articles.articles_last.date}
                  title={articles.articles_last.title}
                  text={articles.articles_last.text}
                  button
                  link={`/news/${articles.articles_last.slug}/${articles.articles_last.id}`}
                />
              )}

              <div className="articles">
                <div className="articles__block">
                  {articles.articles_list.map((item, index) => (
                    <Article
                      key={item.id}
                      img={item.img}
                      title={item.title}
                      date={item.date}
					  link={`/news/${item.slug}/${item.id}`} 
                      cardStyle="card_sm"
                    />
                  ))}
                </div>
              </div>

              <div className="news__pagination-block">
                <div className="container">
                  <div className="pagination-container">
                    <PaginationLink 
					  url={'/news'}
					  pagesCount={pages}
                      pageCurrent={+pageNumber}
					/>
                  </div>
                </div>
              </div>
            </div>
          
        )}

        <Breadcrumbs />
      </main>
    </Layout>
  );
};

export default News;
