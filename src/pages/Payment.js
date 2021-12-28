import React from "react";
import parse from "html-react-parser";
import Layout from "../components/Layout";
import Breadcrumbs from "../components/Breadcrumbs";

import data from "../data";

const Payment = () => {
  let dataPayment = data.payment;
  return (
    <Layout>
      <main className="info-page page">
        <div className="info-page__content_block">
          <div className="info-page__title-block">
            <div className="container">
              <h1 className="title info-page__title">{dataPayment.title}</h1>
            </div>
          </div>

          <div className="container">
            <div className="info-page__content">
              {parse(dataPayment.content)}
            </div>
          </div>
        </div>

		<Breadcrumbs />
      </main>
    </Layout>
  );
};

export default Payment;
