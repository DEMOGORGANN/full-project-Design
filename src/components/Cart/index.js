import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.scss";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Global } from "@emotion/react";
import classnames from "classnames";
import ButtonArrow from "../ButtonArrow";
import CounterInput from "react-counter-input";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQty, removeFromCart } from "../../actions/cartActions";

const Cart = ({ title, button }) => {
  const isTablet = useMediaQuery("(max-width: 1199px)");

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    const header = document.querySelector(".header");
    let s = window.innerWidth - document.documentElement.clientWidth;
    header.style.paddingRight = open ? `${s}px` : "";
  }, [open]);

  const updateCartItemQtyHandler = (id, count) => {
    dispatch(updateCartItemQty(id, count));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const list = () => (
    <Box sx={{ width: "100%", height: "100%" }} role="presentation">
      <Global
        styles={{
          ".MuiDrawer-root > .MuiBackdrop-root": {
            backgroundColor: "rgba(14, 14, 14, 0.7)",
          },
          ".MuiDrawer-root > .MuiPaper-root": {
            overflow: "visible",
            width: isTablet ? "100%" : "720px",
          },
        }}
      />

      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.close} onClick={toggleDrawer(false)}>
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L9.5 9.5M18 18L9.5 9.5M9.5 9.5L18 1L1 18"
                stroke="#1A1A1A"
                strokeWidth="2"
              />
            </svg>
          </div>
          {title}
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.empty_text}>Ваша корзина пуста</div>

            <Link
              onClick={toggleDrawer(false)}
              className={styles.empty_link}
              to="/"
            >
              <ButtonArrow text={"Продолжить покупки"} color={"#222222"} />
            </Link>
          </div>
        ) : (
          <div className={styles.section}>
            <div className={classnames("custom-scrollbar", styles.list)}>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.list_item}>
                  <div className={styles.card}>
                    <Link
                      onClick={toggleDrawer(false)}
                      className={styles.card_img}
                      to={`/product/${item.slug}/${item.id}`}
                    >
                      <img
                        className="contain-center"
                        src={process.env.REACT_APP_API_URL + item.img}
                        alt=""
                      />
                    </Link>

                    <div className={styles.card_content}>
                      <div className={styles.card_top}>
                        <div className={styles.card_block}>
                          <div className={styles.card_title}>
                            <Link
                              onClick={toggleDrawer(false)}
                              to={`/product/${item.slug}/${item.id}`}
                            >
                              {item.title}
                            </Link>
                          </div>
                          <div className={styles.card_volume}>
                            {item.volume}
                          </div>
                        </div>
                        <div
                          className={styles.card_del}
                          onClick={() => removeFromCartHandler(item.id)}
                        >
                          Удалить
                        </div>
                      </div>
                      <div className={styles.card_bottom}>
                        <div className={styles.card_count}>
                          <CounterInput
                            min={1}
                            // max={100}
                            count={item.qty}
                            onCountChange={(count) =>
                              updateCartItemQtyHandler(item.id, count)
                            }
                            inputStyle={{
                              fontWeight: 500,
                              fontSize: 14,
                              width: 30,
                              height: 26,
                            }}
                            btnStyle={{
                              padding: "5px 10px",
                            }}
                          />
                        </div>
                        <div className={styles.price}>
                          {item.price_old && (
                            <span className={styles.price_old}>
                              {item.price_old * item.qty} грн
                            </span>
                          )}
                          <span className={styles.price_new}>
                            {item.price_new * item.qty} грн
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Общая сумма:</span>
                <span>
                  <span>
				 	 {cartItems.reduce((a, c) => a + c.price_new * c.qty, 0)}
				</span> грн
                </span>
              </div>
              <div className={styles.button_block}>
                <Link
                  onClick={toggleDrawer(false)}
                  to="/"
                  className="button button_white "
                >
                  Продолжить покупки
                </Link>
                <Link
                  onClick={toggleDrawer(false)}
                  to="/checkout"
                  className="button button_black "
                >
                  Оформить заказ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
  return (
    <>
      <div onClick={toggleDrawer(true)}>{button}</div>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        variant="temporary"
        ModalProps={{ disableScrollLock: false }}
      >
        {list()}
      </Drawer>
    </>
  );
};

export default Cart;
