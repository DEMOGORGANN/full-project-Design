import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderNav.module.scss";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Global } from "@emotion/react";

const HeaderNav = ({ title, dataNav, slug }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const header = document.querySelector(".header");
	let s = window.innerWidth - document.documentElement.clientWidth;
    header.style.paddingRight = open ? `${s}px` : "";
  }, [open]);

  const list = () => (
    <Box sx={{ width: "100%", height: "100%" }} role="presentation">
      <Global
        styles={{
          ".MuiDrawer-root > .MuiBackdrop-root": {
            backgroundColor: "rgba(14, 14, 14, 0.7)",
          },
		  ".MuiDrawer-root > .MuiPaper-root": {
			width: 442
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
        <div className={styles.list}>
          {dataNav.map((item, index) => (
            <div key={index} className={styles.list_item}>
              <span onClick={toggleDrawer(false)}>
                <Link to={slug ? `/category/${item.slug}` : item.link}>
                  <span>{item.title}</span>

                  <span className={styles.arr_block}>
                    <svg
                      width="27"
                      height="19"
                      viewBox="0 0 27 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.8352 9.10231L18.3977 0.664808C18.178 0.445064 17.822 0.445064 17.6023 0.664808C17.3826 0.884552 17.3826 1.24051 17.6023 1.4602L25.0796 8.93751H0.562518C0.251596 8.93751 0 9.18911 0 9.50003C0 9.81095 0.251596 10.0625 0.562518 10.0625H25.0796L17.6023 17.5398C17.3826 17.7595 17.3826 18.1155 17.6023 18.3352C17.7122 18.445 17.8561 18.5 18 18.5C18.1439 18.5 18.2879 18.445 18.3978 18.3352L26.8353 9.8977C27.0549 9.67801 27.0549 9.32205 26.8352 9.10231Z"
                        fill="#1A1A1A"
                      />
                    </svg>
                  </span>
                </Link>
              </span>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <a href="/">Insagram</a>
          <a href="/">Facebook</a>
        </div>
      </div>
    </Box>
  );
  return (
    <>
      <div onClick={toggleDrawer(true)}>{title}</div>
      <Drawer
        anchor="left"
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

export default HeaderNav;
