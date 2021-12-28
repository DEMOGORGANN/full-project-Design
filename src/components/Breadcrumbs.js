import React from "react";
import { Link, useLocation } from "react-router-dom";

const breadcrumbMap = [
  {
    path: "/about",
    breadcrumb: "About",
  },
  {
    path: "/brands",
    breadcrumb: "Brands",
  },
  {
    path: "/cooperation",
    breadcrumb: "Сотрудничество",
  },
  {
    path: "/news",
    breadcrumb: "Новости",
  }
];

const Breadcrumbs = (props) => {
  let location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  let arrBase = [];

  pathnames.forEach((item) => {
    let x = breadcrumbMap.find((el) => el.path.includes(item));
    if (x) {
      arrBase.push(x);
    }
  });

  let breadcrumbArr = props.arr ? arrBase.concat(props.arr) : arrBase;

  return (
    <div className="container">
      <ul className="breadcrumbs">
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__link">
            Home
          </Link>
        </li>

        {breadcrumbArr.map((value, index) => {
          const last = index === breadcrumbArr.length - 1;

          return (
            <li className="breadcrumbs__item" key={index}>
              {last ? (
                <span className="breadcrumbs__span">{value.breadcrumb}</span>
              ) : (
                <Link className="breadcrumbs__link" to={value.path}>
                  {value.breadcrumb}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
