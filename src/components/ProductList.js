import React from "react";
import Card from "./Card";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProductList = (props) => {
	const isTablet = useMediaQuery("(max-width: 1199px)");
  return (
    <div className="catalog">
		{(isTablet && props.img) && (
			 <img
			 className="catalog__mob-img cover-center"
			 src={process.env.REACT_APP_API_URL + props.img}
			 alt=""
		   />
		)}
      <div className="catalog__content">
        {( !isTablet && props.img) && (
          <div className="catalog__img-block">
            <div className="catalog__img">
              <img
                className="cover-center"
                src={process.env.REACT_APP_API_URL + props.img}
                alt=""
              />
            </div>
          </div>
        )}

        {props.dataProducts.map((item, index) => (
          <Card key={item.id} data={item} cardStyle="card_sm" />
        ))}
      </div>

     
    </div>
  );
};

export default ProductList;
