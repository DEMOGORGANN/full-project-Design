import React from "react";
import parse from "html-react-parser";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";

import data from "../data";

const Privacy = () => {
  let dataPrivacy = data.privacy;
  return (
    <Layout>
      <main className="info-page page">
        <div className="info-page__content_block">
          <div className="info-page__title-block">
            <div className="container">
              <h1 className="title info-page__title">{dataPrivacy.title}</h1>
            </div>
          </div>

          {dataPrivacy.intro && (
            <div className="info-page__intro">
              <div className="container">
                <div className="info-page__content">
                  {parse(dataPrivacy.intro)}
                </div>
              </div>
            </div>
          )}
          <div className="container">
            <div className="info-page__content">
              {parse(dataPrivacy.content)}
            </div>
          </div>
        </div>

		<Breadcrumbs />
      </main>
    </Layout>
  );
};

export default Privacy;
