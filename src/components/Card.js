import React from "react"
import { Link } from "react-router-dom"
import classnames from "classnames"

const Card = (props) => {
  return (
    <div className={classnames("card", props.cardStyle)}>
		 {props.favorites && (
			   <svg className="card__favorites"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			 >
				<path
				  d="M11.5614 5.36982L12 6.17141L12.4386 5.36983C12.8153 4.68156 13.447 3.75162 14.3821 3.02839L14.1561 2.73614L14.3821 3.02839C15.349 2.28061 16.4359 1.90625 17.625 1.90625C20.9457 1.90625 23.5 4.61603 23.5 8.32097C23.5 10.2965 22.7138 11.9805 21.2585 13.7366C19.7905 15.508 17.6802 17.3085 15.0808 19.5236L15.4051 19.9042L15.0808 19.5236L15.0804 19.524C14.2012 20.2732 13.2028 21.1241 12.1645 22.0321L12.1644 22.0322C12.1193 22.0717 12.061 22.0938 12 22.0938C11.939 22.0938 11.8808 22.0717 11.8357 22.0322L11.8355 22.032C10.7977 21.1245 9.79947 20.2738 8.92103 19.5252L8.91974 19.5241L8.60352 19.8951L8.91973 19.5241C6.32008 17.3087 4.20968 15.5081 2.74161 13.7366C1.28621 11.9805 0.5 10.2965 0.5 8.32097C0.5 4.61603 3.05431 1.90625 6.375 1.90625C7.56406 1.90625 8.65098 2.28061 9.61788 3.02839L9.91886 2.63922L9.61788 3.02839C10.553 3.75162 11.1847 4.68152 11.5614 5.36982Z"
				  stroke="#1A1A1A"
				  fill="#1A1A1A"
				/>
			 </svg>
		 )}
      <Link
        to={`/product/${props.data.slug}/${props.data.id}`}
        className={classnames(
          "card__img",
          { "aspect-ratio": props.aspectRatio },
          { [`aspect-ratio_${props.aspectRatioN}`]: props.aspectRatio }
        )}
      >
        <img
          src={process.env.REACT_APP_API_URL + props.data.img}
          alt=""
          className={classnames("contain-center",{ "aspect-ratio__inside": props.aspectRatio})}
        />
      </Link>

      <div className="card__content">
        <div className="card__title">
          <Link to={`/product/${props.data.slug}/${props.data.id}`}>{props.data.title}</Link>
        </div>

        <div className="card__price price">
          <span className="price__new"> {props.data.price_new} ?????? </span>
          {props.data.price_old && (
            <span className="price__old">{props.data.price_old} ??????</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
