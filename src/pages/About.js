import React, { useEffect } from "react";
import parse from "html-react-parser";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";

import { useDispatch, useSelector } from "react-redux";
import { infoAbout } from "../actions/infoActions";
import LoadingBox from "../components/LoadingBox";

const About = () => {
  const dispatch = useDispatch();
  const { loading, error, about } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(infoAbout());
  }, [dispatch]);

  return (
    <Layout>
      <main className="about-page page">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <div className="error-message"> {error} </div>
        ) : (
          <div className="about">
            <div className="container">
              <h1 className="title about__title">{about.title}</h1>
            </div>
            <div className="about__imgs">
              {about.imgs && about.imgs.map((item, i) => (
                <img
                  key={i}
                  className="cover-center"
                  src={process.env.REACT_APP_API_URL + item}
                  alt=""
                />
              ))}
            </div>
            <div className="container">
              <div className="about__info">
                {about.info && about.info.map((item, i) => (
                  <div key={i} className="about__info-block">
                    <h2 className="subtitle">{item.title}</h2>
                    <p className="text">{parse(item.text)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="about__img aspect-ratio">
              <img
                className="aspect-ratio__inside cover-center"
                src={process.env.REACT_APP_API_URL + about.img1}
                alt=""
              />
            </div>
            <div className="container">
              <div className="advantage">
                <h2 className="title advantage__title">
                  {about.advantage.title}
                </h2>
                <div className="advantage__content">
                  {about.advantage.content.map((item, i) => (
                    <div className="advantage__section" key={i}>
                      <div className="advantage__block advantage__img aspect-ratio">
                        <img
                          className="aspect-ratio__inside cover-center"
                          src={process.env.REACT_APP_API_URL + item.img}
                          alt=""
                        />
                      </div>
                      <div className="advantage__block advantage__info">
                        {item.info.map((item, i) => (
                          <div className="advantage__item" key={i}>
                            <h2 className="subtitle">{item.title}</h2>
                            <p className="text">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="about__img aspect-ratio">
              <img
                className="aspect-ratio__inside cover-center"
                src={process.env.REACT_APP_API_URL + about.img2}
                alt=""
              />
            </div>
          </div>
        )}
        <Breadcrumbs />
      </main>
    </Layout>
  );
};

export default About;
