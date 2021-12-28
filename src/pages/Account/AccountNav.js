import React from "react";
import styles from "./AccountNav.module.scss";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

const AccountNav = () => {
	let activeStyle = {
		fontWeight: 500
	  };
  return (
    <div className={styles.header}>
      <div className="container">
        <h1 className={classnames("title", styles.title)}>Мой аккаунт</h1>
      </div>
      <nav className={styles.nav}>
        <NavLink
          to="/profile"
          className={styles.nav_link}
       
		style={({ isActive }) =>
		isActive ? activeStyle : undefined
	  }
        >
          Данные личного кабинета
        </NavLink>
        <NavLink
          to="/orderhistory"
          className={styles.nav_link}
      	style={({ isActive }) =>
		isActive ? activeStyle : undefined
	  }
		 
        >
          История заказов
        </NavLink>
        <NavLink
          to="/favorites"
          className={styles.nav_link}
		  style={({ isActive }) =>
		  isActive ? activeStyle : undefined
		}
        >
          Избранные товары
        </NavLink>
      </nav>
    </div>
  );
};

export default AccountNav;
