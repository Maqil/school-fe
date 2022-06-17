import { styled, lighten } from "@mui/material/styles";

export const ButtonGroupWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row wrap",
  width: "100%"
}));

export const ButtonGroupDelivery = styled('div')(({ theme }) => ({
  flex: "0 0 50%",
  display: "flex",
  flexFlow: "column nowrap",
  paddingRight: "1.5rem",
  position: "relative",
  minWidth: "15rem",
  "&:after": {
    content: '""',
    backgroundColor: theme.palette.blueLight.main,
    position: "absolute",
    height: "80%",
    top: "10%",
    right: 0,
    width: "0.1rem"
  },
  [theme.breakpoints.up("md")]: {
    flexFlow: "row nowrap",
    flex: "0 0 calc(100% - 45rem)",
    paddingRight: "2.8rem"
  }
}));

export const ButtonDelivery = styled('div')(
  ({ theme }) => ({
    color: theme.palette.white.main,
    backgroundColor: theme.palette.blue.main,
    border: 'none',
    fontSize: "0.8rem",
    lineHeight: "1.2rem",
    fontWeight: "bold",
    padding: "2.1rem 1.6rem 0",
    maxWidth: "17.6rem",
    borderRadius: "0.8rem 0.8rem 1rem 1rem",
    width: "100%",
    margin: "0 auto 0.4rem",
    position: "relative",
    textAlign: "center",
    ":nth-of-type(1)": {
      paddingTop: "1rem",
      backgroundColor: lighten(theme.palette.blue.main, 0.55),
      [theme.breakpoints.up("md")]: {
        paddingLeft: 0,
        paddingTop: "1.8rem"
      },
      "&:after": {
        borderTopColor: lighten(theme.palette.blue.main, 0.55),
        [theme.breakpoints.up("md")]: {
          borderLeftColor: lighten(theme.palette.blue.main, 0.55),
          borderTopColor: "transparent"
        }
      }
    },
    ":nth-of-type(2)": {
      backgroundColor: lighten(theme.palette.blue.main, 0.4),
      "&:after": {
        borderTopColor: lighten(theme.palette.blue.main, 0.4),
        [theme.breakpoints.up("md")]: {
          borderLeftColor: lighten(theme.palette.blue.main, 0.4),
          borderTopColor: "transparent"
        }
      }
    },
    ":nth-of-type(3)": {
      backgroundColor: lighten(theme.palette.blue.main, 0.25),
      "&:after": {
        borderTopColor: lighten(theme.palette.blue.main, 0.25),
        [theme.breakpoints.up("md")]: {
          borderLeftColor: lighten(theme.palette.blue.main, 0.25),
          borderTopColor: "transparent"
        }
      }
    },
    ":nth-of-type(4)": {
      backgroundColor: lighten(theme.palette.blue.main, 0.1),
      "&:after": {
        borderTopColor: lighten(theme.palette.blue.main, 0.1),
        [theme.breakpoints.up("md")]: {
          borderLeftColor: lighten(theme.palette.blue.main, 0.1),
          borderTopColor: "transparent"
        }
      }
    },
    "& span": {
      display: "inline-block",
      fontSize: "2.3rem",
      width: "100%",
      marginTop: "0.1rem",
      lineHeight: "2.7rem",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "20rem",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "none",
      margin: 0,
      borderRadius: "0.8rem 1rem 1rem 0.8rem",
      padding: "1.8rem 0.2rem 1.8rem 2.4rem",
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "center",
      justifyContent: "space-between"
    },
    "&:after": {
      content: "''",
      position: "absolute",
      zIndex: "1",
      borderLeft: "7.4rem solid transparent",
      borderRight: "7.4rem solid transparent",
      borderTop: `1.6rem solid ${theme.palette.blue.main}`,
      left: "50%",
      bottom: "-1.2rem",
      marginLeft: "-7.4rem",
      [theme.breakpoints.up("sm")]: {
        borderLeftWidth: "9rem",
        borderRightWidth: "9rem",
        marginLeft: "-9rem"
      },
      [theme.breakpoints.up("md")]: {
        top: "50%",
        left: "auto",
        bottom: "auto",
        right: "-1.6rem",
        width: "0",
        height: "0",
        borderTop: "4rem solid transparent",
        borderLeft: `1.9rem solid ${theme.palette.blue.main}`,
        borderBottom: "4rem solid transparent",
        borderRight: "none",
        marginTop: "-4rem",
        marginLeft: "0"
      }
    }
  })
);

export const ButtonChevron = styled('div')(({ theme }) => ({
  position: "absolute",
  textAlign: "center",
  height: "0.8rem",
  width: "100%",
  left: 0,
  bottom: "-1rem",
  zIndex: "2",
  [theme.breakpoints.up("md")]: {
    height: "100%",
    width: "1.2rem",
    margin: "0 -1rem",
    top: "0",
    left: "auto",
    bottom: "auto",
    right: "-0.8rem"
  },
  "&:before": {
    content: "''",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    width: "51%",
    background: theme.palette.white.main,
    transform: "skew(0deg, 8deg)",
    [theme.breakpoints.up("md")]: {
      height: "51%",
      width: "100%",
      transform: "skew(25deg, 0deg)"
    }
  },
  "&:after": {
    content: "''",
    position: "absolute",
    top: "0",
    right: "0",
    height: "100%",
    width: "50%",
    background: theme.palette.white.main,
    transform: "skew(0deg, -8deg)",
    [theme.breakpoints.up("md")]: {
      height: "50%",
      width: "100%",
      transform: "skew(-25deg, 0deg)",
      top: "auto",
      bottom: "0"
    }
  }
}));

export const ButtonGroupPostDelivery = styled('div')(({ theme }) => ({
  flex: "0 0 50%",
  display: "flex",
  flexFlow: "column nowrap",
  paddingLeft: "1.5rem",
  [theme.breakpoints.up("md")]: {
    flexFlow: "row nowrap",
    flex: "0 0 45rem",
    justifyContent: "space-between"
  }
}));

export const ButtonPostDelivery = styled('div')(
  ({ theme }) => ({
    color: theme.palette.white.main,
    backgroundColor: theme.palette.violet.main,
    border: 'none',
    fontSize: "0.8rem",
    lineHeight: "0.9rem",
    fontWeight: "bold",
    padding: "1.8rem 1.6rem",
    borderRadius: "0.8rem",
    margin: "0 auto 2.4rem",
    maxWidth: "17.6rem",
    width: "100%",
    textAlign: "center",
    "&:last-child": {
      marginBottom: 0
    },
    ":nth-of-type(2)": {
      backgroundColor: theme.palette.purple.main,
    },
    ":nth-of-type(3)": {
      backgroundColor: theme.palette.fuchsiaAccessible.main,
    },
    "& span": {
      display: "inline-block",
      fontSize: "2.3rem",
      width: "100%",
      marginTop: "1.2rem",
      lineHeight: "2.7rem"
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "20rem",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "14rem",
      margin: 0,
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "center",
      justifyContent: "space-between"
    }
  })
);