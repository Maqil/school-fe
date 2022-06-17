import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";

export const SkSelectStyle = styled(FormControl)(({ theme }) => ({
  flex: "0 0 100%",
  marginTop: "1.2rem",
  "&.hidden": {
    display: "none"
  },
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 calc(100% * 1/3 - 2rem * 1/3)",
    marginLeft: "2rem",
    marginTop: 0
  },
  [theme.breakpoints.up("md")]: {
    flex: "0 0 18rem"
  },
  "& .MuiListItemText-root": {
    marginTop: 0,
    marginBottom: 0
  },
  "& .MuiTypography-root": {
    lineHeight: "2.3rem",
    fontWeight: 700
  }
}));
