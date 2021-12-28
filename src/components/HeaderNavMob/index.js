import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderNavMob.module.scss";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import classnames from "classnames";

const Arrow = () => {
  return (
    <svg
      width="19"
      height="27"
      viewBox="0 0 19 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.89769 26.8352L18.3352 18.3977C18.5549 18.178 18.5549 17.822 18.3352 17.6023C18.1154 17.3826 17.7595 17.3826 17.5398 17.6023L10.0625 25.0796L10.0625 0.562518C10.0625 0.251596 9.81089 0 9.49997 0C9.18905 0 8.93745 0.251596 8.93745 0.562518L8.93745 25.0796L1.4602 17.6023C1.24045 17.3826 0.884497 17.3826 0.664804 17.6023C0.554958 17.7122 0.50001 17.8561 0.50001 18C0.50001 18.1439 0.554958 18.2879 0.664804 18.3978L9.1023 26.8353C9.32199 27.0549 9.67795 27.0549 9.89769 26.8352Z"
        fill="#222222"
      />
    </svg>
  );
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  borderBottom: "1px solid #1A1A1A",
  color: "#222222",
  "&:before": {
    display: "none",
  },
});

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<Arrow />} {...props} />
))(({ theme }) => ({
  minHeight: 1,
  padding: "15px 20px",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-180deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: "5px 20px 25px 40px",
});

const HeaderNavMob = ({ dataNavAbout, dataCategory }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const list = () => (
    <Box
      sx={{ width: "100%", height: "100%", paddingTop: "90px" }}
      role="presentation"
    >
      <Global
        styles={{
          ".MuiDrawer-root > .MuiBackdrop-root": {
            backgroundColor: "rgba(14, 14, 14, 0.7)",
          },
          ".MuiDrawer-root > .MuiPaper-root": {
            width: "100%",
          },
        }}
      />

      <div className={styles.content}>
        <div className={styles.container}>
          <ul className={styles.lang}>
            <li className={styles.lang_item}>EN</li>
            <li className={styles.lang_item}>UA</li>
          </ul>
        </div>
        <div className={styles.list}>
          <div className={styles.list_item}>
           
              <Link  onClick={()=>setMobileOpen(false)} className={styles.list_title} to="/">
                Главная
              </Link>
           
          </div>

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <span className={styles.list_title}>О нас</span>
            </AccordionSummary>
            <AccordionDetails>
              <ul className={styles.sublist}>
                {dataNavAbout.map((item, index) => (
                  <li key={index} className={styles.sublist_item}>
                    <Link  onClick={()=>setMobileOpen(false)} to={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <span className={styles.list_title}>Магазин</span>
            </AccordionSummary>
            <AccordionDetails>
              <ul className={styles.sublist}>
                {dataCategory.map((item, index) => (
                  <li key={index} className={styles.sublist_item}>
                    <Link  onClick={()=>setMobileOpen(false)} to={`/category/${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>

          <div className={styles.list_item}>
            <Link  onClick={()=>setMobileOpen(false)} className={styles.list_title} to="/brands">
              Бренды
            </Link>
          </div>
          <div className={styles.list_item}>
            <Link  onClick={()=>setMobileOpen(false)} className={styles.list_title} to="/">
              Оплата и доставка
            </Link>
          </div>
          <div className={styles.list_item}>
            <Link  onClick={()=>setMobileOpen(false)} className={styles.list_title} to="/contacts">  
              Контакты
            </Link>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.account}>
            <Link to="/login"> Зайти в аккаунт</Link>
          </div>

          <div className={styles.soc}>
            <a href="/">Insagram</a>
            <a href="/">Facebook</a>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <>
      <div onClick={handleDrawerToggle}>
        <div 
		 className={classnames("hamburger", {
			active: mobileOpen,
		  })}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Drawer
        sx={{ zIndex: "900" }}
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        ModalProps={{ disableScrollLock: false }}
      >
        {list()}
      </Drawer>
    </>
  );
};

export default HeaderNavMob;
