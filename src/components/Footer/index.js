import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../../data";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useFormik } from "formik";
import * as yup from "yup";

import {CssTextField} from "../../utils/styles";

const validationSubscription = yup.object({
	subscription_email: yup
	  .string("Enter your email")
	  .email("Enter a valid email")
	  .required("Email is required"),
  });

  
const theme = createTheme({
	breakpoints: {
	  values: {
		xs: 0,
		sm: 768,
		md: 900,
		lg: 1200,
		xl: 1400,
	  },
	},
  });

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
  backgroundColor: "#FBFBFB",
  color: "#222222",
  border: "none",
  "&:before": {
    display: "none",
  },
});

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<Arrow />} {...props} />
))(({ theme }) => ({
  minHeight: 60,
  backgroundColor: "#FBFBFB",
  padding: 0,
  margin: "0 30px",
  [theme.breakpoints.down('sm')]: {
	margin: "0 20px",
  },
  borderBottom: "1px solid #1A1A1A",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-180deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: 0,
});

const Footer = () => {
  const isTablet = useMediaQuery("(max-width: 1199px)");

  const [sub, setSub] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const emailSubscription = async (email) => {
    try {
      //   const { data } = await Axios.post('/api/', { email});
    //   const data = true;
      setSub(true);
    } catch (error) {
	setSub(false);
    }
  };

  const formikSubscription = useFormik({
    initialValues: {
		subscription_email: "",
    },
    validationSchema: validationSubscription,
    onSubmit: (values) => {
		emailSubscription(values.subscription_email);
    },
  });

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-top__section footer-top__section_1">
          {isTablet ? (
            <ThemeProvider theme={theme}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                className="footer-mob__block"
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <h3 className="footer-mob__title">Навигация</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="footer-list">
                    {data.footer.navigation.map((item, index) => (
                      <li key={index} className="footer-list__item">
                        <Link to={item.link}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                className="footer-mob__block"
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <h3 className="footer-mob__title">Контакты</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="footer-list">
                    {data.footer.contacts.map((item, index) => (
                      <li key={index} className="footer-list__item">
                        <a href={item.link}>{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </ThemeProvider>
          ) : (
            <>
              <div className="footer-top__block footer-top__content">
                <h3 className="footer__title">Навигация</h3>
                <ul className="footer-list">
                  {data.footer.navigation.map((item, index) => (
                    <li key={index} className="footer-list__item">
                      <Link to={item.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-top__block footer-top__content">
                <h3 className="footer__title">Контакты</h3>
                <ul className="footer-list">
                  {data.footer.contacts.map((item, index) => (
                    <li key={index} className="footer-list__item">
                      <a href={item.link}>{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="footer-top__section">
          <div className="footer-top__content">
            {sub ? (
              <div className="footer-top__sub">
                <h3 className="footer__title">Подписка подтверждена!</h3>
                <div className="footer__text">
                  Вы успешно подписались на нашу рассылку. И теперь первыми
                  узнаете о наших акциях и уникальных предложениях!
                </div>
              </div>
            ) : (
              <div className="footer-top__sub">
                <h3 className="footer__title">Подписка на рассылку</h3>
                <form onSubmit={formikSubscription.handleSubmit}>
                  <div className="footer__input-block">
				  <CssTextField
                      fullWidth
                      id="subscription_email"
                      name="subscription_email"
                      label="Email *"
                      variant="standard"
                      value={formikSubscription.values.subscription_email}
                      onChange={formikSubscription.handleChange}
                      error={
                        formikSubscription.touched.subscription_email &&
                        Boolean(formikSubscription.errors.subscription_email)
                      }
                      helperText={
                        formikSubscription.touched.subscription_email &&
                        formikSubscription.errors.subscription_email
                      }
                    />
                  </div>
                  <div className="footer__text">
                    Узнавайте первые о новинках, мероприятиях и наших новостях!
                  </div>
                  <button
                    type="submit"
                    className="button button_black button_lg"
                  >
                    Отправить
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom__content">
            © Delight, 2021. Всі права захищені.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
