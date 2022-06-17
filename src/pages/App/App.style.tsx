import { styled } from "@mui/material/styles";

export const MainContainer = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  marginRight: "auto",
  padding: "2.4rem 1rem",
  maxWidth: "122.4rem",
  minHeight: "calc(100% - 33.5rem)",
  [theme.breakpoints.up("sm")]: {
    padding: "2.4rem 2rem"
  }
}));

export const AppWrapper = styled("div")({
  height: "100%"
});
