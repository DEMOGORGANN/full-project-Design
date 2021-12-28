import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { postNews } from "../../actions/infoActions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/Breadcrumbs";
import LoadingBox from "../../components/LoadingBox";
import TitleBlock from "./TitleBlock";
import Article from "./Article";
import parse from "html-react-parser";

const Post = () => {
  const newsPost = useSelector((state) => state.newsPost);
  const { loading, error, post } = newsPost;

  const dispatch = useDispatch();
  const params = useParams();
  const { id: newsId } = params;

  useEffect(() => {
    dispatch(postNews(newsId));
  }, [dispatch, newsId]);

  return (
    <Layout>
      <main className="post-page page">
        {loading ? (
          <LoadingBox />
        )  : error ? (
			<div className="error-message"> {error} </div>
		  ) : (
			  <>
            <div className="post">
              <TitleBlock
                img={post.img}
                date={post.date}
                title={post.title}
                text={post.text}
              />

              <div className="info-page ">
                <div className="info-page__content_block">
                  <div className="container">
                    <div className="info-page__content">
                      {parse(post.content)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <h2 className="title post__title">Другие новости</h2>
              </div>

              <div className="post__articles">
                <div className="articles">
                  <div className="articles__block">
                    {post.articles_list.map((item, index) => (
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
              </div>
            </div>

			<Breadcrumbs  arr={[
                  {
                    path: "",
                    breadcrumb: `${post.title}`,
                  },
                ]}/>
			</>
          
        )}

       
      </main>
    </Layout>
  );
};

export default Post;
