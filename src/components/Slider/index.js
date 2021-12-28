import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import Card from "../Card";
import "swiper/swiper.scss";
import useMediaQuery from "@mui/material/useMediaQuery";

SwiperCore.use([Navigation]);

const Slider = (props) => {
	const isTablet = useMediaQuery("(max-width: 1199px)");
  return (
    <Swiper
      navigation={isTablet ? false : true}
      loop={true}
      slidesPerView={'auto'}
	 
      className="slider-product"
    >
      {props.dataSlider.map((slideContent, index) => (
        <SwiperSlide key={slideContent.id} className="slider-product__slide">
          <Card
            data={slideContent}
            cardStyle="card_md"
            aspectRatio
            aspectRatioN="1"
          />
        </SwiperSlide>
      ))}
	  
    </Swiper>
  );
};

export default Slider;
