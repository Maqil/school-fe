import { styled } from "@mui/material/styles";

export const HistoryList = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 50%",
    paddingRight: "2rem",
    borderRight: `0.2rem solid ${theme.palette.blueLight.main}`
  },
  "& ul": {
    padding: "0 0 0 0.4rem",
    margin: 0,
    listStyle: "none"
  },
  "& .shipment-details-title": {
    display: "none",
    fontSize: "1.8rem",
    fontWeight: "700",
    width: "100%",
    marginBottom: theme.spacer_m,
    [theme.breakpoints.up("sm")]: {
      display: "inline-block"
    },
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacer_l
    }
  },
  "& li": {
    padding: "0 0 2.5rem 3rem",
    position: "relative",
    "& .check-icon": {
      fontSize: "1.4rem",
      color: "white",
      position: "absolute",
      left: "0.1rem",
      zIndex: "2",
      top: "1rem",
      display: "none"
    },
    "&:before": {
      content: "''",
      position: "absolute",
      zIndex: "1",
      top: "0.9rem",
      left: "0",
      width: "1.6rem",
      height: "1.6rem",
      display: "inline-block",
      backgroundColor: theme.palette.blue.main,
      border: `1px solid ${theme.palette.white.main}`,
      outline: `1px solid ${theme.palette.blue.main}`,
      borderRadius: "2.5rem"
    },
    "&:after": {
      content: "''",
      position: "absolute",
      zIndex: "0",
      top: "0.9rem",
      bottom: "-0.9rem",
      left: "0.7rem",
      borderLeft: `2px solid ${theme.palette.blue.main}`
    },
    "&.code-DLD,&.code-DPU,&.code-DDL": {
      "& .MuiSvgIcon-root": {
        display: "inline-block"
      }
    },
    "&:last-of-type": {
      paddingBottom: 0,
      "&:after": {
        display: "none"
      }
    },
    "& .history-event-time": {
      color: theme.palette.blue.main,
      fontSize: "1.2rem",
      fontWeight: 700
    },
    "& .history-event-description": {
      color: theme.palette.black.main,
      fontSize: "1.2rem",
      fontWeight: 700
    }
  }
}));
