import React, { useState } from "react";
import styles from "./FilterMob.module.scss";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

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
  <MuiAccordionSummary {...props} />
))({
  fontWeight: 500,
  fontSize: 18,
  lineHeight: "156%",
  minHeight: 1,
  padding: "15px 20px",
 
  "& .MuiAccordionSummary-content": {
	paddingRight: 10,
    margin: 0,
	position: "relative",
  },
  "& .MuiAccordionSummary-content:before": {
	position: "absolute",
	right: 0,
	top: "50%",
	transform: "translateY(-50%)",
	content: "'+'",
  },
  "& .Mui-expanded.MuiAccordionSummary-content:before": {
	content: "'-'",
  },
});

const AccordionDetails = styled(MuiAccordionDetails)({
  fontSize: 16,
  lineHeight: "162%",
  padding: "15px 20px 50px 40px",
});

const FilterMob = ({ dataFilter }) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const list = () => (
    <Box sx={{ width: "100%", height: "100%" }} role="presentation">
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
          Фильтр
        </div>
        <form action="">
          <div className={styles.list}>
            {dataFilter.map((item, i) => (
              <Accordion
                key={i + 1}
                expanded={expanded === `panel${i + 1}`}
                onChange={handleChange(`panel${i + 1}`)}
                className={styles.list_item}
              >
                <AccordionSummary
                  aria-controls={`panel${i + 1}d-content`}
                  id={`panel${i + 1}d-header`}
                  className={styles.list_title}
                >
                  {item.title}
                </AccordionSummary>
                <AccordionDetails className={styles.list_content}>
                  <ul className={styles.sublist}>
                    {item.value.map((item, index) => (
                      <li key={index} className={styles.sublist_item}>
                        <span>{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          <div className={styles.button_block}>
            <button type="button" className="button button_black">
              Применить
            </button>
          </div>
          <div className={styles.reset}>
            <span>Очистить все фильтра</span>
          </div>
        </form>
      </div>
    </Box>
  );

  return (
    <>
      <div className={styles.button} onClick={toggleDrawer(true)}>
        <span>Фильтр</span>
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
      </div>
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

export default FilterMob;
