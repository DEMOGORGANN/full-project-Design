import React from "react";
import { Link } from "react-router-dom";
import styles from "./Article.module.scss";
import classnames from "classnames";
import ButtonArrow from "../../components/ButtonArrow";

const Article = ({ img, title, date, link }) => {
  return (
    <article className={styles.article}>
      <div className={classnames("aspect-ratio aspect-ratio_3", styles.img)}>
        <img className="aspect-ratio__inside cover-center" src={process.env.REACT_APP_API_URL + img} alt="" />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.block}>
        <div className={styles.date}>{date}</div>
        <Link className={styles.link} to={link}>
          <ButtonArrow text={" Смотреть"} color={"#222222"} />
        </Link>
      </div>
    </article>
  );
};

export default Article;
