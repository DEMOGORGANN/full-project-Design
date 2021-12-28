import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation,  useNavigate} from "react-router-dom";
import styles from "./Header.module.scss";
import Collapse from "@mui/material/Collapse";
import HeaderNav from "../HeaderNav";
import HeaderNavMob from "../HeaderNavMob";
import Cart from "../Cart";
import data from "../../data";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";
import { langChange } from "../../actions/langActions";
import { listCategories } from "../../actions/categoryActions";

import { useTranslation } from 'react-i18next';

const Lang = () => {
	const { i18n } = useTranslation();
	
	// const changeLanguage = (lng) => {
	//   i18n.changeLanguage(lng);
	// };
  const dispatch = useDispatch();
  const { currentLang } = useSelector((state) => state.lang);
  const [expanded, setExpanded] = useState(false);

//   let location = useLocation();
//   let navigate = useNavigate();
 
  const langMap = [
	{
	  id: "ru",
	  title: "RU",
	  link: ""
	},
	{
	  id: "ua",
	  title: "UA",
	  link: "/ua"
	},
	{
	  id: "en",
	  title: "EN",
	  link: "/en"
	},
 ];


  const getLangList = (cl) => {
    return langMap.filter((x) => x.id !== cl.id);
  };
  let langList = getLangList(currentLang);

  const langListHandler = (langId) => {
	
    let langObj = langMap.find((x) => x.id === langId);
    dispatch(langChange(langObj));

	 i18n.changeLanguage(langId);

  };

//   console.log(i18n);
  
  let params = useParams();
  
//   let currentLangId = (params.lang==="ua" || params.lang==="en") ? params.lang : "ru";
 

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={styles.lang}
    >
      <span data-lang={currentLang.id}>{currentLang.title} </span>

      <Collapse in={expanded} className={styles.lang_content}>
        <div className={styles.lang_block}>
          {langList.map((item, i) => (
            <div
              onClick={(e) => langListHandler(e.target.dataset.lang)}
              key={i}
              data-lang={item.id}
              className={styles.lang_item}
            >
              {item.title}
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

const Header = () => {
  const dispatch = useDispatch();

  const isTablet = useMediaQuery("(max-width: 1199px)");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const { loading, error, categories } = useSelector(
    (state) => state.categoryList
  );

  useEffect(() => {
	  if (!categories.length) {
		dispatch(listCategories());
	  }
  }, [categories, dispatch]);

  const { t } = useTranslation();

  return (
    <header className="header">
		
      <div className="header__content">
        {isTablet ? (
          <div className="header-mob-menu">
            {!loading && !error && (
              <HeaderNavMob
                dataNavAbout={data.navAbout}
                dataCategory={categories}
              />
            )}
          </div>
        ) : (
          <div className="header-menu">
            <div className="header__item header-menu__item ">
              {!loading && !error && (
                <HeaderNav dataNav={categories} title={t("store")} slug />
              )}
            </div>
            <div className="header__item header-menu__item ">
              <Link to={`/brands`}> {t("brands")} </Link>
            </div>

            <div className="header__item header-menu__item ">
              {!loading && !error && (
                <HeaderNav dataNav={data.navAbout} title={t("about_us")}  />
              )}
            </div>
          </div>
        )}

        <div className="logo">
          <Link to={`/`}>
            <img src={process.env.REACT_APP_API_URL + "img/logo.png"} alt="" />
          </Link>
        </div>
        <div className="header-user">
          <div className="header-user__item header__search">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7956 1C16.2055 1 20.5912 5.38564 20.5912 10.7956C20.5912 13.4151 19.563 15.7945 17.8881 17.5521L22.83 22.5764L21.9642 23.4422L16.9891 18.3851C15.3013 19.7641 13.145 20.5912 10.7956 20.5912C5.38564 20.5912 1 16.2056 1 10.7956C1 5.38564 5.38564 1 10.7956 1ZM10.7956 2.22445C6.06188 2.22445 2.22445 6.06188 2.22445 10.7956C2.22445 15.5293 6.06188 19.3667 10.7956 19.3667C15.5293 19.3667 19.3667 15.5293 19.3667 10.7956C19.3667 6.06188 15.5293 2.22445 10.7956 2.22445Z"
                fill="#222222"
                stroke="#222222"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          {!isTablet && (
            <>
              <div className="header-user__item header__user">
                <Link to={userInfo ? "/profile" : "/login"}>
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.830078 23.4266C0.87147 21.067 1.83788 18.818 3.5212 17.164C5.20453 15.5099 7.47011 14.5831 9.83008 14.5831C12.1901 14.5831 14.4556 15.5099 16.139 17.164C17.8223 18.818 18.7887 21.067 18.8301 23.4266M14.9905 5.84615C14.9905 6.48256 14.8652 7.11274 14.6216 7.7007C14.3781 8.28866 14.0211 8.8229 13.5711 9.2729C13.1211 9.72291 12.5869 10.0799 11.9989 10.3234C11.411 10.567 10.7808 10.6923 10.1444 10.6923C9.50798 10.6923 8.87781 10.567 8.28984 10.3234C7.70188 10.0799 7.16764 9.72291 6.71764 9.2729C6.26763 8.8229 5.91067 8.28866 5.66712 7.7007C5.42358 7.11274 5.29823 6.48256 5.29823 5.84615C5.29823 4.56087 5.80881 3.32824 6.71764 2.41941C7.62647 1.51058 8.85911 1 10.1444 1C11.4297 1 12.6623 1.51058 13.5711 2.41941C14.48 3.32824 14.9905 4.56087 14.9905 5.84615Z"
                      stroke="#222222"
                      strokeWidth="1.5"
                    />
                  </svg>
                </Link>
              </div>
              <Lang />
            </>
          )}
        </div>
        <div className="header__item header__item_cart">
          <Cart
            title={t("cart")}
            button={
              isTablet ? (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.2468 5.91014H17.9049V0.821371C17.9049 0.595189 17.7214 0.411621 17.4952 0.411621H7.50383C7.27765 0.411621 7.09408 0.595189 7.09408 0.821371V5.91014H1.75291C1.53984 5.91014 1.36021 6.07666 1.34447 6.28908L0.00114584 24.1483C-0.00737697 24.2617 0.031959 24.3745 0.108664 24.4564C0.185369 24.5403 0.294855 24.5882 0.409585 24.5882H24.5907C24.7055 24.5882 24.815 24.5403 24.891 24.4571C24.9684 24.3745 25.0077 24.2617 24.9992 24.1476L23.6559 6.28908C23.6401 6.07666 23.4605 5.91014 23.2468 5.91014ZM17.4952 8.50697C17.7024 8.50697 17.8708 8.6748 17.8708 8.88066C17.8708 9.08718 17.7024 9.25567 17.4952 9.25567C17.288 9.25567 17.1195 9.08718 17.1195 8.88066C17.1195 8.6748 17.288 8.50697 17.4952 8.50697ZM7.91358 1.23178H17.0854V5.91079H7.91358V1.23178ZM7.50383 8.50697C7.711 8.50697 7.87949 8.6748 7.87949 8.88066C7.87949 9.08718 7.711 9.25567 7.50383 9.25567C7.29667 9.25567 7.12818 9.08718 7.12818 8.88066C7.12818 8.6748 7.29667 8.50697 7.50383 8.50697ZM0.850804 23.7693L2.1325 6.73029H7.09408V7.76483C6.63713 7.93267 6.30868 8.36798 6.30868 8.88132C6.30868 9.5402 6.84496 10.0758 7.50383 10.0758C8.16271 10.0758 8.69899 9.5402 8.69899 8.88132C8.69899 8.36798 8.37054 7.93267 7.91358 7.76483V6.73029H17.0854V7.76483C16.6285 7.93267 16.3 8.36798 16.3 8.88132C16.3 9.5402 16.8363 10.0758 17.4952 10.0758C18.1541 10.0758 18.6903 9.5402 18.6903 8.88132C18.6903 8.36798 18.3619 7.93267 17.9049 7.76483V6.73029H22.8672L24.1489 23.7693H0.850804Z"
                    fill="#1A1A1A"
                  />
                </svg>
              ) : (
					 t("cart")
              )
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
