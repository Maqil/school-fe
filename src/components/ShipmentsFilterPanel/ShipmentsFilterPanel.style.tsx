import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";

export const FilterPanel = styled(FormGroup)(({ theme }) => ({
  display: "flex",
  flexFlow: "row wrap",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    flexFlow: "column-reverse wrap"
  },
  [theme.breakpoints.up("md")]: {
    flexFlow: "column wrap",
    justifyContent: "flex-end"
  }
}));

export const FilterPanelButtonWrapper = styled("div")(({ theme }) => ({
  flex: "0 0 100%",
  textAlign: "center",
  marginTop: "0.8rem",
  "& .MuiButton-root": {
    width: "100%",
    marginBottom: "2rem"
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiButton-root": {
      width: "26rem",
      marginTop: "1.5rem",
      marginBottom: 0
    }
  },
  [theme.breakpoints.up("md")]: {
    flex: "0 0 auto",
    marginTop: "-4.5rem",
    textAlign: "right",
    "& .MuiButton-root": {
      width: "auto",
      margin: 0
    }
  }
}));

export const FilterPanelFieldsWrapper = styled("div")(({ theme }) => ({
  flex: "0 0 100%",
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    width: "100%",
    alignItems: "flex-end"
  },
  "& .MuiFormControl-root": {
    flex: "0 0 100%",
    marginBottom: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      flex: "0 0 calc(50% - 1rem)"
    },
    [theme.breakpoints.up("md")]: {
      flex: "0 0 calc(25% - 6rem/4)"
    }
  }
}));

export const StatusMenuItem = styled(MenuItem)(() => ({
  display: "flex",
  flexFlow: "row-reverse"
}));
