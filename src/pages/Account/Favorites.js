import React from "react";
import AccountNav from "./AccountNav";
import Card from "../../components/Card";
import styles from "./Favorites.module.scss";
import Layout from "../../components/Layout";
import data from "../../data";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

const Favorites = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  let dataFavorites = data.favorites;
  return (
    <Layout>
      <main className="account page">
        {isMobile ? (
          <div className="container">
            <h1 className="account-mob__title title">Избранные товары</h1>

            <div className="account-mob__button-block">
              <Link to="/account" className="account-mob__button">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2106_11676)">
                    <path
                      d="M0.164795 13.8977L8.60229 22.3352C8.82204 22.5549 9.178 22.5549 9.39769 22.3352C9.61743 22.1154 9.61743 21.7595 9.39769 21.5398L1.92037 14.0625L26.4375 14.0625C26.7484 14.0625 27 13.8109 27 13.5C27 13.189 26.7484 12.9375 26.4375 12.9375L1.92037 12.9375L9.39769 5.4602C9.61743 5.24045 9.61743 4.8845 9.39769 4.6648C9.28784 4.55496 9.14388 4.50001 8.99996 4.50001C8.85605 4.50001 8.71214 4.55496 8.60224 4.6648L0.164742 13.1023C-0.0549488 13.322 -0.0549488 13.6779 0.164795 13.8977Z"
                      fill="#1A1A1A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2106_11676">
                      <rect
                        width="27"
                        height="27"
                        fill="white"
                        transform="translate(27 27) rotate(-180)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <span>Назад</span>
              </Link>
            </div>
          </div>
        ) : (
          <AccountNav />
        )}
        <div className={styles.favorites}>
          {dataFavorites.map((item, index) => (
            <div key={item.id} className={styles.item}>
              <Card
                data={item}
                cardStyle="card_md"
                aspectRatio
                aspectRatioN="1"
                favorites
              />
            </div>
          ))}
        </div>
        {isMobile && (
            <div className="container">
				 <div className={styles.link_block}>
              <div className="account-mob__link-block">
                <Link to="/profile" className="account-mob__link">
                  <span>Данные кабинета</span>
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_634_4237)">
                      <path
                        d="M26.8352 13.1023L18.3977 4.66481C18.178 4.44506 17.822 4.44506 17.6023 4.66481C17.3826 4.88455 17.3826 5.24051 17.6023 5.4602L25.0796 12.9375H0.562518C0.251596 12.9375 0 13.1891 0 13.5C0 13.811 0.251596 14.0625 0.562518 14.0625H25.0796L17.6023 21.5398C17.3826 21.7595 17.3826 22.1155 17.6023 22.3352C17.7122 22.445 17.8561 22.5 18 22.5C18.1439 22.5 18.2879 22.445 18.3978 22.3352L26.8353 13.8977C27.0549 13.678 27.0549 13.3221 26.8352 13.1023Z"
                        fill="#1A1A1A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_634_4237">
                        <rect width="27" height="27" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <Link to="/orderhistory" className="account-mob__link">
                  <span>История заказов</span>
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_634_4237)">
                      <path
                        d="M26.8352 13.1023L18.3977 4.66481C18.178 4.44506 17.822 4.44506 17.6023 4.66481C17.3826 4.88455 17.3826 5.24051 17.6023 5.4602L25.0796 12.9375H0.562518C0.251596 12.9375 0 13.1891 0 13.5C0 13.811 0.251596 14.0625 0.562518 14.0625H25.0796L17.6023 21.5398C17.3826 21.7595 17.3826 22.1155 17.6023 22.3352C17.7122 22.445 17.8561 22.5 18 22.5C18.1439 22.5 18.2879 22.445 18.3978 22.3352L26.8353 13.8977C27.0549 13.678 27.0549 13.3221 26.8352 13.1023Z"
                        fill="#1A1A1A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_634_4237">
                        <rect width="27" height="27" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Favorites;
