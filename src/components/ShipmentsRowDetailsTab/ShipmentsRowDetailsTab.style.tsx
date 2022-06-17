import { styled } from "@mui/material/styles";

export const DetailsList = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "flex-start",
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 50%",
    paddingLeft: "2rem",
    borderLeft: `0.2rem solid ${theme.palette.blueLight.main}`,
    marginLeft: "-0.2rem"
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
  "& .shipment-details-item": {
    flex: "0 0 100%",
    display: "flex",
    marginBottom: theme.spacer_m,
    [theme.breakpoints.up("sm")]: {
      flex: "0 0 calc(50% - 1.6rem/2)"
    },
    "&:nth-of-type(2n + 1)": {
      [theme.breakpoints.up("sm")]: {
        paddingRight: "1.6rem"
      }
    },
    "&:last-of-type": {
      marginBottom: 0
    }
  },
  "& .shipment-details-icon": {
    flex: "0 0 5.5rem",
    display: "flex",
    alignItems: "center",
    "& i": {
      color: theme.palette.blue.main,
      fontSize: "1.8rem",
      padding: "0.4rem"
    }
  },
  "& .shipment-details-info": {
    flex: "0 0 calc(100% - 5.5rem)"
  },
  "& .shipment-details-label": {
    fontSize: "1.2rem"
  },
  "& .shipment-details-data": {
    fontSize: "1.2rem",
    fontWeight: "700",
    "&.is-late": {
      color: theme.palette.error.main,
      fontWeight: 700
    }
  },
  "& .action-details-item": {
    display: "flex",
    flex: "0 0 100%",

    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    "& a": {
      fontSize: "1.3rem",
      fontWeight: "700",
      color: theme.palette.fuchsiaAccessible.main
    },
    "& .shipment-action-icon": {
      paddingLeft: "0.5rem",

      "& i": {
        fontSize: "1.8rem",
        padding: "0.4rem",
        color: theme.palette.fuchsiaAccessible.main
      }
    }
  }
}));
