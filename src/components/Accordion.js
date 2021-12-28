import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

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
))(({ theme }) => ({
  color: "#222222",
  border: "none",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<Arrow />} {...props} />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0)",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-180deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  border: "none",
}));

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {props.dataAccordions.map((item, i) => (
        <Accordion
          key={i + 1}
          expanded={expanded === `panel${i + 1}`}
          onChange={handleChange(`panel${i + 1}`)}
          className={props.classes.item}
        >
          <AccordionSummary
            aria-controls={`panel${i + 1}d-content`}
            id={`panel${i + 1}d-header`}
            className={props.classes.title}
          >
            {item.title}
          </AccordionSummary>
          <AccordionDetails className={props.classes.content}>
            {item.content}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
