import { styled, lighten, alpha } from "@mui/material/styles";
import { Button, Paper } from "@mui/material";

export const ListFooter = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-between",
  position: "relative",
  marginBottom: theme.spacer_m,
  marginTop: theme.spacer_m,
  [theme.breakpoints.up("sm")]: {
    flexFlow: "row nowrap",
    marginBottom: theme.spacer_l
  }
}));

export const ListRowWrapper = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  padding: 0,
  boxShadow: "none",
  [theme.breakpoints.up("md")]: {
    backgroundColor: theme.palette.white.main,
    padding: "0 1.6rem",
    boxShadow: `0px 2px 4px 0px ${alpha(theme.palette.blue.main, 0.1)}`
  }
}));

export const ListLoading = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  paddingTop: "6rem",
  paddingBottom: "5rem",
  "& .MuiCircularProgress-root": {
    color: lighten(theme.palette.fuchsia.main, 0.5)
  }
}));

export const ListPagination = styled("div")(({ theme }) => ({
  flex: "0 0 100%",
  textAlign: "center",
  padding: "0.6rem 1.6rem 2.1rem",
  lineHeight: "2.8rem",
  fontSize: "1.6rem",
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 20rem",
    textAlign: "left",
    padding: "1.4rem 0 1.3rem"
  },
  "& span": {
    fontWeight: "700",
    paddingLeft: "0.5rem"
  }
}));

export const ListLoadMore = styled("div")(({ theme }) => ({
  flex: "1 0 auto",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  height: "3.8rem",
  [theme.breakpoints.up("sm")]: {
    order: 1,
    height: "5.5rem"
  },
  "& .MuiButton-root": {
    margin: "auto"
  }
}));

export const ListGoBackUpWrapper = styled("div")(({ theme }) => ({
  textAlign: "right",
  position: "absolute",
  right: 0,
  top: 0,
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 20rem",
    position: "static",
    order: 2
  }
}));

export const ListGoBackUp = styled(Button)(({ theme }) => ({
  width: "3.8rem",
  height: "3.8rem",
  borderRadius: "2.75rem",
  minWidth: "auto",
  padding: 0,
  backgroundColor: theme.palette.fuchsia.main,
  color: theme.palette.white.main,
  [theme.breakpoints.up("sm")]: {
    width: "5.5rem",
    height: "5.5rem"
  },
  "&:before": {
    content: "''",
    position: "absolute",
    top: "0.7rem",
    left: "50%",
    height: "0.2rem",
    width: "2rem",
    background: theme.palette.white.main,
    marginLeft: "-1rem",
    [theme.breakpoints.up("sm")]: {
      top: "1.3rem",
      width: "2.5rem",
      marginLeft: "-1.2rem"
    }
  },
  "& .MuiSvgIcon-root": {
    fontSize: "3rem",
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      fontSize: "3.5rem"
    }
  }
}));

export const ListNoResults = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  paddingTop: "4rem",
  paddingBottom: "3rem",
  [theme.breakpoints.up("sm")]: {
    paddingTop: "8rem",
    paddingBottom: "8rem"
  },
  "& .empty-box": {
    maxWidth: "19rem",
    marginBottom: theme.spacer_m,
    [theme.breakpoints.up("sm")]: {
      maxWidth: "22.6rem"
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "25rem"
    }
  },
  "& .noresults-title": {
    marginBottom: theme.spacer_xs
  }
}));
