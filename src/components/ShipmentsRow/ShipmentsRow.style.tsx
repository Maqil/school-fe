import { styled, alpha, lighten } from "@mui/material/styles";
import { Button } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export const RowBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  borderRadius: "0.8rem",
  padding: "1.8rem 1.6rem",
  marginBottom: "2rem",
  boxShadow: `0px 2px 4px 0px ${alpha(theme.palette.blue.main, 0.1)}`,
  [theme.breakpoints.up("md")]: {
    boxShadow: "none",
    borderTop: `0.1rem solid ${theme.palette.disabled.main}`,
    borderRadius: 0,
    padding: "0.5rem 0 0",
    marginBottom: 0
  },
  "&:first-of-type": {
    borderTopWidth: 0,
    paddingTop: "1.8rem"
  },
  "&:last-of-type": {
    marginBottom: 0
  },
  "& .row-details-wrapper": {
    paddingTop: "1rem"
  }
}));

export const RowSummaryWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row wrap",
  width: "100%",
  position: "relative",
  paddingBottom: "0.5rem",
  [theme.breakpoints.up("sm")]: {
    paddingRight: "5rem"
  },
  [theme.breakpoints.up("md")]: {
    flexFlow: "row nowrap",
    paddingRight: "6rem"
  },
  "& .data-label": {
    fontSize: "1.2rem",
    lineHeight: "2rem",
    whiteSpace: "nowrap"
  },
  "& .data-value": {
    fontSize: "1.3rem",
    fontWeight: "700",
    lineHeight: "2rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    "&.is-late": {
      color: theme.palette.error.main,
      fontWeight: 700
    }
  },
  "& .data-extra": {
    display: "flex",
    alignItems: "center",
    fontWeight: "400",
    textTransform: "capitalize",
    "& .MuiSvgIcon-root": {
      fontSize: "1.3rem",
      color: "inherit",
      margin: "0 0.5rem"
    },
    "& .details-con-city": {
      maxWidth: "10rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    "& .details-ship-city": {
      maxWidth: "14rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textAlign: "right"
    }
  }
}));

export const RowSummaryAirbill = styled("div")(({ theme }) => ({
  flex: "0 0 50%",
  paddingBottom: "1rem",
  paddingRight: "1rem",
  maxWidth: "50%",
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 25%",
    maxWidth: "25%"
  },
  [theme.breakpoints.up("md")]: {
    flex: "0 0 16%",
    paddingRight: "2rem",
    maxWidth: "16%",
    order: 1
  }
}));

export const RowSummaryReference = styled("div")(({ theme }) => ({
  flex: "0 0 50%",
  paddingBottom: "1rem",
  paddingRight: "2.5rem",
  maxWidth: "50%",
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 25%",
    maxWidth: "25%",
    paddingRight: "1rem"
  },
  [theme.breakpoints.up("md")]: {
    flex: "0 0 16%",
    paddingRight: "2rem",
    maxWidth: "16%",
    order: 1
  }
}));

export const RowSummaryConsigneeName = styled("div")(({ theme }) => ({
  flex: "0 0 50%",
  paddingBottom: "1rem",
  paddingRight: "1rem",
  maxWidth: "50%",
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 25%",
    maxWidth: "25%"
  },
  [theme.breakpoints.up("md")]: {
    flex: "0 0 16%",
    paddingRight: "2rem",
    maxWidth: "16%",
    order: 1
  }
}));

export const RowSummaryEstimatedDeliveryDate = styled("div")(({ theme }) => ({
  flex: "0 0 50%",
  paddingBottom: "1rem",
  paddingRight: "1rem",
  maxWidth: "50%",
  "& .data-value": {
    textTransform: "capitalize"
  },
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 25%",
    maxWidth: "25%"
  },
  [theme.breakpoints.up("md")]: {
    flex: "0 0 16%",
    maxWidth: "16%",
    paddingRight: "2rem",
    order: 2
  }
}));

export const RowSummaryLastEventType = styled("div")(({ theme }) => ({
  flex: "0 0 100%",
  paddingBottom: "1rem",
  maxWidth: "100%",
  "& .data-value": {
    display: "flex",
    justifyContent: "space-between"
  },
  "&  .data-bar": {
    backgroundColor: theme.palette.disabled.main,
    width: "100%",
    height: "0.5rem",
    position: "relative",
    borderRadius: "2.5rem"
  },
  "&  .data-progression": {
    backgroundColor: theme.palette.success.main,
    width: "0",
    height: "0.5rem",
    position: "absolute",
    borderRadius: "2.5rem",
    "&[data-type='BKD']": {
      width: "10%",
      backgroundColor: theme.palette.success.main
    },
    "&[data-type='RCS']": {
      width: "30%",
      backgroundColor: theme.palette.success.main
    },
    "&[data-type='DEP']": {
      width: "60%",
      backgroundColor: theme.palette.success.main
    },
    "&[data-type='RCF']": {
      width: "60%",
      backgroundColor: theme.palette.success.main
    },
    "&[data-type='RPU']": {
      width: "60%",
      backgroundColor: theme.palette.success.main
    },
    "&[data-type='MAN']": {
      width: "60%",
      backgroundColor: theme.palette.success.main
    },
    "&[data-type='ARR']": {
      width: "60%",
      backgroundColor: theme.palette.success.main
    },
    "&[data-type='PUL']": {
      width: "60%",
      backgroundColor: theme.palette.success.main
    },
    "&[data-type='DLV']": {
      width: "60%",
      backgroundColor: theme.palette.success.main
    },
    "&[data-type='GDL']": {
      width: "80%",
      backgroundColor: theme.palette.success.main
    },
    "&[data-type='DLD']": {
      width: "100%",
      backgroundColor: theme.palette.black.main
    },
    "&[data-type='DPU']": {
      width: "100%",
      backgroundColor: theme.palette.black.main
    },
    "&[data-type='DDL']": {
      width: "100%",
      backgroundColor: theme.palette.black.main
    },
    "&[data-type='ADL']": {
      width: "80%",
      backgroundColor: theme.palette.ochre.main
    },
    "&[data-type='ATD']": {
      width: "80%",
      backgroundColor: theme.palette.ochre.main
    },
    "&[data-type='RTS']": {
      width: "100%",
      backgroundColor: theme.palette.error.main
    }
  },
  [theme.breakpoints.up("md")]: {
    flex: "0 0 36%",
    paddingRight: "2rem",
    maxWidth: "36%",
    order: 1
  }
}));

export const RowSummaryButton = styled(Button)(({ theme }) => ({
  width: "2.4rem",
  height: "2.4rem",
  backgroundColor: theme.palette.fuchsiaLight.main,
  top: 0,
  right: 0,
  position: "absolute",
  margin: 0,
  minWidth: "auto",
  [theme.breakpoints.up("sm")]: {
    top: "-1.8rem",
    right: "-1.6rem",
    borderRadius: "0 0.5rem 0.5rem 0",
    width: "5rem",
    height: "calc(100% + 3.6rem)"
  },
  [theme.breakpoints.up("md")]: {
    top: "-0.5rem",
    right: 0,
    borderRadius: 0,
    height: "calc(100% + 0.5rem)"
  },
  "& .MuiSvgIcon-root": {
    fontSize: "2.4rem",
    color: theme.palette.fuchsiaAccessible.main,
    [theme.breakpoints.up("sm")]: {
      fontSize: "3.6rem"
    }
  },
  "&.row-details-expanded": {
    backgroundColor: theme.palette.violetLight.main,
    [theme.breakpoints.up("sm")]: {
      borderRadius: "0 0.5rem 0 0"
    },
    [theme.breakpoints.up("md")]: {
      borderRadius: 0
    },
    "& .MuiSvgIcon-root": {
      transform: "rotate(180deg)"
    }
  },
  "&:focus": {
    boxShadow: `0 0 2px 1px ${alpha(theme.palette.fuchsia.main, 0.5)}`
  }
}));

export const ShipmentDetailsNavTabs = styled(TabList)(({ theme }) => ({
  marginLeft: "-1.6rem",
  width: "calc(100% + 3.2rem)",
  "& .MuiTabs-flexContainer": {
    borderBottom: `2px solid ${theme.palette.fuchsiaLight.main}`
  },
  "& .MuiTab-root": {
    fontSize: "1.3rem",
    textTransform: "none",
    "&.Mui-selected": {
      color: theme.palette.black.main,
      fontWeight: 700
    },
    "& .MuiTouchRipple-child": {
      backgroundColor: theme.palette.fuchsia.main
    },
    "&.Mui-disabled": {
      backgroundColor: alpha(theme.palette.disabled.main, 0.2)
    },
    "&:hover": {
      backgroundColor: theme.palette.fuchsiaLight.main
    },
    "&.Mui-focusVisible": {
      backgroundColor: theme.palette.fuchsiaLight.main
    }
  }
}));

export const ListTabPanel = styled(TabPanel)(() => ({
  padding: "2.4rem 0 1.6rem 0.2rem"
}));

export const ContentLoading = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "1.6rem",
  "& .MuiCircularProgress-root": {
    color: lighten(theme.palette.fuchsia.main, 0.5)
  },
  "& .error": {
    color: theme.palette.error.main
  }
}));

export const DesktopTabWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "flex-start",
    paddingRight: "3.4rem"
  },
  [theme.breakpoints.up("md")]: {
    border: `2px solid ${theme.palette.blueLight.main}`,
    borderRadius: "0.8rem",
    padding: "2rem 5rem 2rem 2rem",
    marginBottom: "2rem"
  }
}));
