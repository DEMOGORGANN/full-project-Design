import React from "react";

import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Brands from "./pages/Brands";
import Product from "./pages/Product";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import News from "./pages/News";
import Post from "./pages/News/Post";
import Checkout from "./pages/Checkout";
import Cooperation from "./pages/Cooperation";
import Program from "./pages/Cooperation/Program";
import Contacts from "./pages/Contacts";
import Privacy from "./pages/Privacy";
import Payment from "./pages/Payment";
import Thankyou from "./pages/Thankyou";
import Search from "./pages/Search";

import Profile from "./pages/Account/Profile";
import OrderHistory from "./pages/Account/OrderHistory";
import Favorites from "./pages/Account/Favorites";
import Account from "./pages/Account";

 const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/about",
    component: <About />,
  },
  {
    path: "/product/:slug/:id",
    component: <Product />,
  },
  {
    path: "/brands",
    component: <Brands />,
  },
  {
    path: "/brands/:slug",
    component: <Catalog />,
  },
  {
    path: "/brands/:slug/page/:pageNumber",
    component: <Catalog />,
  },
  {
    path: "/category/:slug",
    component: <Catalog />,
  },
  {
    path: "/category/:slug/page/:pageNumber",
    component: <Catalog />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/news",
    component: <News />,
  },
  {
    path: "/news/page/:pageNumber",
    component: <News />,
  },
  {
    path: "/news/:slug/:id",
    component: <Post />,
  },
  {
    path: "/orderhistory",
    component: <OrderHistory />,
  },
  {
    path: "/favorites",
    component: <Favorites />,
  },
  {
    path: "/checkout",
    component: <Checkout />,
  },
  {
    path: "/cooperation",
    component: <Cooperation />,
  },
  {
    path: "/cooperation/:slug/:id",
    component: <Program />,
  },
  {
    path: "/contacts",
    component: <Contacts />,
  },
  {
    path: "/account",
    component: <Account />,
  },
  {
    path: "/privacy",
    component: <Privacy />,
  },
  {
    path: "/payment",
    component: <Payment />,
  },
  {
    path: "/thankyou",
    component: <Thankyou />,
  },
  {
    path: "/search",
    component: <Search />,
  },
];

export const RoutesApp = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
	   {/* {routes.map((route, index) => (
        <Route key={index} path={`/:locale${route.path}`} element={route.component} />
      ))} */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
