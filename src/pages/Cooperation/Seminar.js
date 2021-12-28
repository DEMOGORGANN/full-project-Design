import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const Seminar = (props) => {
	return (
		<>
		{props.dataSeminars.map((item, i) => (
		<div key={item.id} className="seminar">
		  <div className="seminar__img seminar__section">
			<img src={process.env.REACT_APP_API_URL + item.img} alt="" className="cover-center" />
		  </div>
		  <div className="seminar__section seminar__content">
			<div className="seminar__text-block">
			  <h2 className="seminar__title subtitle">{item.title}</h2>
			  <div className="seminar__text text"> {parse(item.text)}</div>
			  <div className="seminar__price">
			  Цена семинара:
				<span> {item.price} грн.</span>
			  </div>
			</div>
			<div className="seminar__button-block">
			  <Link to={`/cooperation/${item.slug}/${item.id}`} className="button button_white seminar__button seminar__button_1">
				Смотреть программу
			  </Link>
			  <button
			   onClick={props.handleOpen}
				type="button"
				className="button button_black seminar__button seminar__button_2"
			  >
				Записаться
			  </button>
			</div>
		  </div>
		</div>
	  ))}
	  </>
	  )
	
}

export default Seminar;
