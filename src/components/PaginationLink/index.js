import React from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const ArrowBack = () => {
  return (
    <svg
      width="27"
      height="19"
      viewBox="0 0 27 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.164795 9.89769L8.60229 18.3352C8.82204 18.5549 9.178 18.5549 9.39769 18.3352C9.61743 18.1154 9.61743 17.7595 9.39769 17.5398L1.92037 10.0625L26.4375 10.0625C26.7484 10.0625 27 9.81089 27 9.49997C27 9.18905 26.7484 8.93745 26.4375 8.93745L1.92037 8.93745L9.39769 1.4602C9.61743 1.24045 9.61743 0.884497 9.39769 0.664804C9.28784 0.554958 9.14388 0.50001 8.99996 0.50001C8.85605 0.50001 8.71214 0.554958 8.60224 0.664804L0.164742 9.1023C-0.0549488 9.32199 -0.0549488 9.67795 0.164795 9.89769Z"
        fill="#222222"
      />
    </svg>
  );
};
const ArrowForward = () => {
  return (
    <svg
      width="27"
      height="19"
      viewBox="0 0 27 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.8352 9.10231L18.3977 0.664808C18.178 0.445064 17.822 0.445064 17.6023 0.664808C17.3826 0.884552 17.3826 1.24051 17.6023 1.4602L25.0796 8.93751H0.562518C0.251596 8.93751 0 9.18911 0 9.50003C0 9.81095 0.251596 10.0625 0.562518 10.0625H25.0796L17.6023 17.5398C17.3826 17.7595 17.3826 18.1155 17.6023 18.3352C17.7122 18.445 17.8561 18.5 18 18.5C18.1439 18.5 18.2879 18.445 18.3978 18.3352L26.8353 9.8977C27.0549 9.67801 27.0549 9.32205 26.8352 9.10231Z"
        fill="#222222"
      />
    </svg>
  );
};

const PaginationLink = ({ url, pagesCount, pageCurrent }) => {
  return (
    <Pagination
      page={pageCurrent}
      count={pagesCount}
      sx={{ border: "1px solid #1A1A1A" }}
      renderItem={(item) => (
        <PaginationItem
          components={{ previous: ArrowBack, next: ArrowForward }}
          component={Link}
          to={`${url}/${item.page === 1 ? "" : `page/${item.page}`}`}
          {...item}
          sx={{
            fontFamily: "PTRootUIWebVF, sans-serif",
            fontSize: 18,
            color: "#222222",
            borderRadius: "0 !important",
            margin: 0,
            padding: "10px 5px",
            lineHeight: 1.7,
            height: 50,
            minWidth: 50,
            "&.Mui-selected": {
              borderLeft: "1px solid #1A1A1A",
              borderRight: "1px solid #1A1A1A",
              background: "none",
            },
            "&.Mui-selected:hover": {
              background: "none",
            },
            "&:hover": {
              background: "none",
            },
          }}
        />
      )}
    />
  );
};

export default PaginationLink;
