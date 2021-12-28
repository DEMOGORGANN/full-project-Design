import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import styles from "./TitleBlock.module.scss";
import classnames from "classnames";

import ButtonArrow from "../../components/ButtonArrow";

const TitleBlock = ({img, date, title, text, button, link}) => {

	return (
		<div className={styles.block}>
				<div className={styles.section}>
					<div className={styles.date}>
						{date}
					</div>
					<div className={classnames("title", styles.title)}>
						{title}
					</div>
					<div className={classnames("text", styles.text)}>
						{parse(text)}
					</div>
					
					{button && (
						   <Link
							className={styles.link}
							to={link}
						 >
							<ButtonArrow text={" Смотреть"} color={"#222222"} />
						 </Link>
					)}
				</div>
				<img className= {classnames("cover-center", styles.img)} src={process.env.REACT_APP_API_URL + img} alt="" />
		</div>
	)
}

export default TitleBlock;