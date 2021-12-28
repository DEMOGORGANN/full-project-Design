import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import ButtonArrow from "./ButtonArrow";

const MainBrand = (props) => {
  return (
    <div className="main-brand">
      <div className="main-brand__desc">
        <h3 className="main-brand__title">
          <Link  to={`/brands/${props.dataBrand.slug}`}>{props.dataBrand.title}</Link>
        </h3>
        <div className="main-brand__text">{props.dataBrand.text}</div>
        <Link className="main-brand__link" to={`/brands/${props.dataBrand.slug}`}>
		 	 <ButtonArrow text={" Смотреть"} color={"#222222"} />
        </Link>
      </div>

      <img className="main-brand__img cover-center" src={process.env.REACT_APP_API_URL + props.dataBrand.img} alt="" />

      <div className="main-brand__cards">
        {props.dataBrand.products.map((item, index) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default MainBrand;
