import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import parse from "html-react-parser";
import Seminar from "./Seminar";
import BasicModal from "../../components/BasicModal";
import Breadcrumbs from "../../components/Breadcrumbs";

import { useDispatch, useSelector } from "react-redux";
import { infoCooperation } from "../../actions/infoActions";
import LoadingBox from "../../components/LoadingBox";

const Cooperation = () => {
  const [openCooperation, setOpenCooperation] = useState(false);
  const handleOpenCooperation = () => setOpenCooperation(true);
  const handleCloseCooperation = () => setOpenCooperation(false);

  const [openSeminars, setOpenSeminars] = useState(false);
  const handleOpenSeminars = () => setOpenSeminars(true);
  const handleCloseSeminars = () => setOpenSeminars(false);

  const dispatch = useDispatch();
  const { loading, error, cooperation } = useSelector(
    (state) => state.cooperation
  );

  useEffect(() => {
    dispatch(infoCooperation());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <main className="page">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <div className="error-message"> {error} </div>
          ) : (
            <>
              <div className="cooperation">
                <div className="container">
                  <h1 className="cooperation__title title">Сотрудничество</h1>
                </div>
                <div className="cooperation-section">
                  <div className="cooperation-section__block cooperation-section__block_1">
                    {cooperation.text1.map((item, i) => (
                      <div className="cooperation-section__text-block" key={i}>
                        <h3 className="cooperation-section__title subtitle">
                          {item.title}
                        </h3>
                        <div className="cooperation-section__text text">
                          {parse(item.text)}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={handleOpenCooperation}
                      type="button"
                      className="cooperation-section__button button button_black button_lg"
                    >
                      Получить прайс
                    </button>
                  </div>
                  <img
                    className="cooperation-section__img cover-center"
                    src={process.env.REACT_APP_API_URL + cooperation.img1}
                    alt=""
                  />
                  <div className="cooperation-section__block">
                    {cooperation.text2.map((item, i) => (
                      <div className="cooperation-section__text-block" key={i}>
                        <h3 className="cooperation-section__title subtitle">
                          {item.title}
                        </h3>
                        <div className="cooperation-section__text text">
                          {parse(item.text)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <img
                    className="cooperation-section__img cooperation-section__img_2 cover-center"
                    src={process.env.REACT_APP_API_URL + cooperation.img2}
                    alt=""
                  />
                </div>
                <div className="cooperation-section__text-section">
                  <div className="container">
                    {cooperation.text3.map((item, i) => (
                      <div className="cooperation-section__text-block" key={i}>
                        <h3 className="cooperation-section__title subtitle">
                          {item.title}
                        </h3>
                        <div className="cooperation-section__text text">
                          {parse(item.text)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div id="seminars" className="seminars">
                <div className="container">
                  <h1 className="seminars__title title">Семинары</h1>
                </div>
                <div className="seminars__content">
                  <Seminar
                    dataSeminars={cooperation.seminars}
                    handleOpen={handleOpenSeminars}
                  />
                </div>
              </div>
            </>
          )}

          <Breadcrumbs />
        </main>
      </Layout>
      <BasicModal
        open={openCooperation}
        handleClose={handleCloseCooperation}
        type={"cooperation"}
        buttonText={"Получить прайс"}
      />

      <BasicModal
        open={openSeminars}
        handleClose={handleCloseSeminars}
        type={"seminars"}
        buttonText={"Отправить заявку"}
      />
    </>
  );
};

export default Cooperation;
