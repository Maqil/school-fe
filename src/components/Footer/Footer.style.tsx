import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

//export const FooterContainer = styled('footer')({
export const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.violet.main,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    backgroundImage:
      "radial-gradient(100.6rem 78.9rem at 80% center, rgba(255, 255, 255, 0.21), transparent 37.4rem)"
  }
}));

export const FooterContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "2.6rem 1rem",
  maxWidth: "112.4rem",
  color: "white",
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    textAlign: "left",
    padding: "4rem 2rem"
  }
}));

export const FooterFirstDiv = styled(Box)(({ theme }) => ({
  flex: "100%",
  width: "100%",
  "& h4": {
    fontWeight: "bold",
    fontSize: "1.8rem",
    lineHeight: "3.4rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.4rem",
      lineHeight: "2rem"
    }
  },
  "& p": {
    fontWeight: "normal",
    fontSize: "1.8rem",
    lineHeight: "2.9rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
      lineHeight: "2rem"
    }
  },
  [theme.breakpoints.up("sm")]: {
    flex: "50%",
    width: "39.1rem"
  },

  "& img": {
    width: "14.1rem",
    marginBottom: "2.4rem",
    [theme.breakpoints.up("sm")]: {
      width: "8rem"
    }
  }
}));

export const FooterSecondDiv = styled(Box)(({ theme }) => ({
  flex: "100%",
  "div:first-of-type a": {
    marginRight: 0,
    fontWeight: "bold",
    fontSize: "2rem",
    lineHeight: "3.4rem",
    [theme.breakpoints.up("sm")]: {
      marginRight: "2.4rem",
      fontSize: "1.4rem",
      lineHeight: "2rem"
    }
  },
  "div:nth-of-type(2) a": {
    marginRight: 0,
    fontWeight: "normal",
    fontSize: "2rem",
    lineHeight: "3.4rem",
    [theme.breakpoints.up("sm")]: {
      marginRight: "1.6rem",
      fontSize: "1.2rem",
      lineHeight: "2rem"
    }
  },
  "div a:last-child": {
    marginRight: 0
  },
  [theme.breakpoints.up("sm")]: {
    flex: "50%",
    textAlign: "right"
  }
}));

export const FooterThirdDiv = styled(Box)(({ theme }) => ({
  flex: "100%",
  "& p": {
    fontWeight: "normal",
    fontSize: "2rem",
    lineHeight: "3.4rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
      lineHeight: "2rem"
    }
  }
}));

export const FooterLinks = styled(Box)(({ theme }) => ({
  "& a": {
    display: "block",
    marginBottom: "3rem",
    textDecoration: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inline"
    },
    ":hover": {
      color: theme.palette.white.main
    }
  }
}));
