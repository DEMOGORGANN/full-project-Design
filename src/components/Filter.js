import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import classnames from "classnames";

function TabPanel({ children, value, index }) {
	return (
	  <div
		hidden={value !== null ? value !== index : true}
		id={`tabpanel-${index}`}
		className="filter__panel"
	  >
		{children}
	  </div>
	);
  }

  const List = (props) => {
	return (
	  <ul className="filter-list">
		{props.listItems.map((item, i) => (
		  <li className="filter-list__item" key={i}>
			<ListItem content={item.title} />
		  </li>
		))}
	  </ul>
	);
  };

  const ListItem = ({ content }) => {
	const [active, setActive] = useState(false);
	const handleClick = () => {
	  setActive((prev) => !prev);
	};
	return (
	  <span className={classnames({ active: active })} onClick={handleClick}>
		{content}
	  </span>
	);
  };

const Filter = (props) => {
	const isTablet = useMediaQuery("(max-width: 1199px)");
	
	const [panelActive, setPanelActive] = useState(null);
	const [panelOpen, setPanelOpen] = useState(false);

	const handleClickTab = (index) => {
		if (index === panelActive) {
		  setPanelOpen(false);
		  setPanelActive(null);
		} else {
		  if (!panelOpen) {
			setPanelOpen(true);
		  }
		  setPanelActive(index);
		}
	  };

  return (
	<div className="filter">
	<div className="filter__content">
	  <div className="filter__tabs">
		{props.dataFilter.map((item, i) => (
		  <div
			className={classnames("filter__tab", {
			  active: i === panelActive,
			})}
			key={i}
			data-index={i}
			onClick={() => handleClickTab(i)}
		  >
			{item.title}
		  </div>
		))}
	  </div>

	  <div
		className={classnames("filter__panels", {
		  open: panelOpen,
		})}
	  >
		<div className="filter__panels-content">
		  <div className="container">
			{isTablet && (
			  <div className="filter__button">
				Очистить все фильтра
			  </div>
			)}
			{props.dataFilter.map((item, i) => (
			  <TabPanel key={i} index={i} value={panelActive}>
				<List listItems={item.value} />
			  </TabPanel>
			))}
		  </div>
		</div>
	  </div>
	</div>
	{!isTablet && (
	  <div className="filter__button">Очистить все фильтра</div>
	)}
  </div>
  );
};

export default Filter;
