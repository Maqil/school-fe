import { styled } from "@mui/material/styles";
import { Accordion } from "@mui/material";

export const PageHeader = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "4.8rem",
  width: "100%",
  justifyContent: "space-between",
  flexFlow: "row wrap",
  marginBottom: theme.spacer_l,
  [theme.breakpoints.up("md")]: {
    flexFlow: "row nowrap"
  },
  "& .pageTitle": {
    flex: "1 1 auto",
    lineHeight: "4.8rem"
  },
  "& .headerExtra": {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-end",
    flex: "0 0 100%",
    marginTop: "3.2rem",
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row nowrap"
    },
    [theme.breakpoints.up("md")]: {
      flex: "0 1 54.5rem",
      marginTop: 0
    }
  }
}));

export const SectionAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.white.main,
  borderRadius: "0.8rem",
  "&.not-loaded": {
    opacity: "0.2"
  },
  "&:last-of-type, &:first-of-type": {
    borderRadius: "0.8rem"
  },
  "& .MuiAccordionSummary-root": {
    padding: "0 1.6rem",
    minHeight: "5.5rem",
    [theme.breakpoints.up("md")]: {
      pointerEvents: "none",
      cursor: "default"
    },
    "&.Mui-focusVisible": {
      backgroundColor: theme.palette.fuchsiaLight.main
    }
  },
  "& .MuiAccordionSummary-content": {
    margin: "1rem 0"
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  "& .MuiSvgIcon-root": {
    fontSize: "2.4rem",
    color: theme.palette.fuchsiaAccessible.main
  },
  "& .MuiCollapse-root": {
    [theme.breakpoints.up("md")]: {
      visibility: "visible",
      overflow: "visible",
      height: "auto !important" //overwrite the javascript inline style if coming from mobile after closing the overview section
    }
  },
  "& .MuiAccordionDetails-root": {
    padding: "0.8rem 1.6rem 2rem",
    [theme.breakpoints.up("sm")]: {
      paddingTop: "0.6rem",
      paddingBottom: "2.4rem"
    }
  }
}));
