import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const SmallTextTypo = styled(Typography)(({ theme }) => ({
  fontsize: "0.875rem",
  fontfamily: "OpenSans"
}));
export const LargeTextTypo = styled(Typography)(({ theme }) => ({
  fontWeight: "Bold",
  fontsize: "1rem",
  fontfamily: "OpenSans"
}));
export const ItemHeader = styled("div")({
  paddingTop: "3rem",
  paddingLeft: "2rem"
});
export const FooterBox = styled(Box)(({ theme }) => ({
  paddingTop: "3rem",
  paddingBottom: "3rem",
  marginRight: "1rem",
  marginLeft: "2rem",
  "& .MuiLink-root": {
    color: "rgb(50, 65, 190)",
    textDecorationColor: "rgb(50, 65, 190)"
  }
}));
