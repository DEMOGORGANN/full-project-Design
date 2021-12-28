import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import parse from "html-react-parser";
import Seminar from "./Seminar";
import BasicModal from "../../components/BasicModal";
import Breadcrumbs from "../../components/Breadcrumbs";

import { useDispatch, useSelector } from "react-redux";
import { detailsProgram } from "../../actions/infoActions";
import { useParams } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";

const Program = () => {
  const [openSeminars, setOpenSeminars] = useState(false);
  const handleOpenSeminars = () => setOpenSeminars(true);
  const handleCloseSeminars = () => setOpenSeminars(false);

  const dispatch = useDispatch();
  const params = useParams();
  const { id: programId } = params;
  const programDetails = useSelector((state) => state.programDetails);
  const { loading, error, program } = programDetails;

  useEffect(() => {
    dispatch(detailsProgram(programId));
  }, [dispatch, programId]);

  return (
    <>
      <Layout>
        <main className="program-page page">
          {loading ? (
            <LoadingBox />
          )  : error ? (
			<div className="error-message"> {error} </div>
		  ) : (
              <>
                <div className="program">
                  <div className="container">
                    <h1 className="program__title title">
						  {program.title}
                    </h1>
                  </div>
                  <div className="program__img aspect-ratio">
                    <img
                      src={process.env.REACT_APP_API_URL + program.img_lg}
                      alt=""
                      className="aspect-ratio__inside cover-center"
                    />
                  </div>
                  <div className="container">
                    <div className="program__content">
                      <div className="program__info">
                        <div className="program__info-item">
                          <span>Преподаватель: </span>
                          {program.info.teacher}
                        </div>
                        <div className="program__info-item">
                          <span>Продолжительность курса:</span>
                          {program.info.duration}
                        </div>
                        <div className="program__info-item">
                          <span>Дата ближайшего курса:</span>
                          {program.info.date}
                        </div>
                        <div className="program__info-item">
                          <span>Стоимость курса:</span>
                          {program.price} грн.
                        </div>
                      </div>
                      <div className="program__desc text">
                        {parse(program.desc)}
                      </div>
                      <ul className="program__list">
                        {program.programSection.map((item, i) => (
                          <li key={i} className="program__list-item">
                            <h3 className="subtitle">{item.title}</h3>
                            <div className="text">{parse(item.text)}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="other-seminars">
                  <div className="container">
                    <h1 className="program__subtitle title">Другие семинары</h1>
                  </div>
                  <div className="other-seminars__content">
                    <Seminar
                      dataSeminars={program.otherSeminars}
                      handleOpen={handleOpenSeminars}
                    />
                  </div>
                  <div className="container">
                    <div className="other-seminars__button-block">
                      <Link
                        to="/cooperation"
                        className="button button_white button_lg"
                      >
                        Все семинары
                      </Link>
                    </div>
                  </div>
                </div>

					 <Breadcrumbs arr={[
                  {
                    path: "",
                    breadcrumb: `${program.title}`,
                  },
                ]}/>

              </>
          )}

        </main>
      </Layout>
      <BasicModal
        open={openSeminars}
        handleClose={handleCloseSeminars}
        type={"seminars"}
        buttonText={"Отправить заявку"}
      />
    </>
  );
};

export default Program;
