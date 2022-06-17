import { Button, Drawer, Popover } from "@mui/material";
import { styled } from "@mui/material/styles";
export const HeaderContainer = styled("header")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  justifyContent: "space-between",
  padding: "1.5rem 2rem",
  [theme.breakpoints.up("sm")]: {
    padding: "1.5rem 1rem"
  }
}));
export const LogoWrapper = styled("div")({
  flex: "0 0 auto",
  width: "10rem"
});
export const HeaderButton = styled((props: any) => <Button {...props} />)(
  ({ theme }) => ({
    fontSize: "1.4rem",
    color: theme.palette.black.main,
    "&.MuiButton-root": {
      color: theme.palette.black.main,
      fontWeight: "Bold"
    },
    fontweight: "bold",
    textTransform: "none",
    minWidth: "0",
    borderRadius: "50%",
    backgroundColor: theme.palette.white.main,
    width: "4rem",
    height: "4rem",
    margin: "0 1rem",
    "&.user-icon": {
      display: "inline-flex",
      flexDirection: "row",
      paddingRight: "1rem"
    }
  })
);
export const ToolbarToggleButton = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none"
  }
}));
export const ToolBarNavigation = styled("nav")({
  display: "flex",
  height: "100%",
  alignContent: "center",
  padding: "0 1rem"
});
export const MainContainerDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.blueLight.main,
  width: "100%",
  height: "8rem"
}));
export const MainContainerMenu = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  height: "8rem",
  margin: "1rem 2rem 1rem",
  padding: "1.5rem 3rem",
  fontWeight: 700,
  fontSize: "1.4rem",
  [theme.breakpoints.up("sm")]: {
    padding: "0 1rem",
    margin: "0 0 0"
  },
  [theme.breakpoints.up("xs")]: {
    padding: "0 1rem",
    margin: "0 0 0"
  }
}));
export const MainWrapper = styled("div")({
  marginBottom: "6rem"
});
export const MainLeftNav = styled("div")({
  display: "inline-flex",
  alignItems: "center",

  "& .logo-wrapper": {
    position: "absolute",
    left: "1rem",
    top: "2.1rem",
    width: "10rem"
  }
});
export const MainRightNav = styled("div")({
  display: "inline-flex",
  alignItems: "center",
  "& .hamIconShow": {
    display: "inline-flex"
  },
  "& .hamIconHide": {
    display: "none"
  }
});
export const MenuHamburgerButton = styled((props: any) => (
  <Button {...props} />
))(({ theme }) => ({
  minWidth: "6rem",
  height: "3rem",
  padding: "0.2rem 0.2rem",
  color: theme.palette.black.main,
  [theme.breakpoints.up("sm")]: {
    display: "none"
  }
}));
export const PopoverDiv = styled((props: any) => <Popover {...props} />)(
  ({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: "1.5rem",
      border: `0.1rem solid ${theme.palette.black.main}`,
      backgroundColor: theme.palette.white.main,
      width: "24rem"
    }
  })
);
export const SideNavContainer = styled("div")(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: 700,
  [theme.breakpoints.up("sm")]: {
    "& .MuiDrawer-paper": {
      width: "37.5rem"
    },
    "& .MuiPaper-root": {
      width: "37.5rem"
    },
    display: "none"
  }
}));
export const MainRightNavItem = styled("div")(({ theme }) => ({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  [theme.breakpoints.up("sm")]: {
    padding: "0 1rem",
    margin: "1rem 0 0"
  },
  "& .main-left-nav-item": {
    display: "inline-flex",
    marginLeft: "2.375rem",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  "& .language-hide": {
    padding: "0 0.5rem 0",
    display: "inline-flex",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  "& .language-show": {
    padding: "0 0.5rem 0",
    display: "inline-flex"
  },
  "& .profile-hide": {
    display: "none !important"
  },
  "& .profile-show": {
    [theme.breakpoints.down("sm")]: {
      display: "none !important"
    }
  }
}));
export const SideRightNavItem = styled("div")(({ theme }) => ({
  alignItems: "left",
  justifyContent: "flex-end",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  "& .side-profile-item": {
    display: "flex",
    flexDirection: "column",
    padding: "2rem 0 1rem 0",
    "& .side-bold-line": {
      paddingTop: "1rem",
      width: "100%",
      margin: "0",
      height: "0.5rem",
      borderBottom: `0.1rem solid ${theme.palette.black.main}`
    },
    "& .side-profile": {
      display: "inline-block",
      paddingBottom: "2rem",
      fontWeight: "700",
      width: "100%",
      justifyContent: "space-between",
      "& .side-btn-profile": {
        marginLeft: "1rem",
        maxHeight: "4.5rem"
      }
    },
    "& .side-profile-line": {
      display: "inline-block"
    }
  }
}));
export const MainLeftNavItemUL = styled("ul")({
  display: "inline-flex",
  padding: "0"
});
export const SideRightNavItemUL = styled("ul")(({ theme }) => ({
  display: "inline-flex",
  flexDirection: "column",
  paddingInlineStart: "2rem",
  paddingInlineEnd: "1rem"
}));
export const MainLeftNavItemLi = styled("li")(({ theme }) => ({
  display: "inline-block",
  margin: "0 10px",

  "& .menu-text": {
    lineHeight: "2rem",
    whiteSpace: "nowrap",
    color: theme.palette.black.main,
    fontSize: "1.4rem",
    fontWeight: "700",
    marginLeft: "1rem"
  },
  "& .main-menu": {
    "&:hover": {
      color: theme.palette.black.main,
      textDecoration: "none"
    }
  },
  "& .menu-action": {
    alignItems: "center",
    padding: "1rem",
    width: "100%",
    display: "flex",
    flexFlow: "row nowrap",
    textDecoration: "none",
    textAlign: "left",
    textTransform: "none",
    justifyContent: "flex-start",
    color: theme.palette.black.main,
    fontSize: "1.4rem",
    fontWeight: "700",
    "&:hover": {
      backgroundColor: theme.palette.fuchsiaLight.main,
      textDecoration: "none"
    },
    "&:focus-visible": {
      border: `0.1rem solid ${theme.palette.blue.main}`
    }
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.black.main
  }
}));
export const SideRightNavItemLi = styled("li")(({ theme }) => ({
  display: "inline-block",
  paddingBottom: "2rem",
  fontWeight: "700",
  width: "100%",
  paddingLeft: 0,
  flexFlow: "row nowrap",
  textAlign: "left",
  textTransform: "none",
  justifyContent: "flex-start",
  "& .side-menu-text": {
    "&:hover": {
      backgroundColor: "transparent",
      textDecoration: "none"
    },
    whiteSpace: "nowrap",
    color: theme.palette.black.main,
    fontSize: "1.4rem"
  }
}));
export const MainRightNavItemSpan = styled("span")({
  fontSize: "1.4rem",
  fontWeight: "700"
});
export const BoldLine = styled("div")(({ theme }) => ({
  padding: "0 1rem 0 2rem",
  height: "0.5rem",
  borderBottom: `0.1rem solid ${theme.palette.black.main}`
}));
export const SideNavFooterContainer = styled("div")(({ theme }) => ({
  height: "19.5rem",
  marginTop: "auto",
  backgroundColor: theme.palette.sideBackdrop.main,
  clipPath: "polygon(0 15%,100% 0%,100% 100%,0% 100%)",
  order: "3",
  flexDirection: "column",
  display: "flex",
  width: "100%",
  position: "absolute",
  padding: " 1.5rem 0",
  bottom: "0",
  right: "0"
}));
export const SideNavFooterContent = styled("div")({
  padding: "5rem 1.5rem 0",
  width: "100%",

  "& .side-lang": {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem"
  }
});

export const MainLeftNavItemHref = styled("a")(({ theme }) => ({
  whiteSpace: "nowrap",
  textDecoration: "none",
  color: theme.palette.black.main,
  fontSize: "1.4rem",
  fontWeight: "700"
}));

export const GreetingDiv = styled("div")(({ theme }) => ({
  padding: "0 0.5rem 0.6rem"
}));
export const PopOverPaper = styled("div")({
  display: "inline-flex",
  flexDirection: "row",
  paddingTop: "1rem",
  fontWeight: "700",
  "& .profile-name": {
    margin: "0.8rem"
  }
});
export const DrawerPaper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "1rem 0 1rem 1rem",

  "& .logo-wrapper": {
    flex: "0 0 auto",
    height: "4.5rem"
  },
  "& .close-icon": {
    fontSize: "2.5rem",
    paddingRight: "0px",
    cursor: "pointer"
  }
});
export const FooterLinks = styled("div")(({ theme }) => ({
  "& a": {
    display: "inline",
    marginBottom: "3rem",
    textDecoration: "none",
    fontSize: "1.2rem",
    marginRight: "1.5rem",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      display: "inline"
    }
  }
}));
export const SideDrawer = styled((props: any) => <Drawer {...props} />)(
  ({ theme }) => ({
    "& .MuiDrawer-paper": {
      width: "100%",
      backgroundColor: theme.palette.white.main,
      [theme.breakpoints.up("sm")]: {
        width: "100%"
      }
    }
  })
);
export const LanguageContainer = styled("div")(
  ({ panelopen, paneloff }: { panelopen: string; paneloff: string }) =>
    ({ theme }) => ({
      "& .lang-toggle": {
        width: "6.4rem",
        height: "3.2rem",
        position: "relative",
        display: "inline-block",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
        borderRadius: "3.2rem",
        cursor: "pointer",
        "& .slider": {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          borderRadius: "3.2rem",
          backgroundColor: theme.palette.blue.main,
          transition: "all 0.4s ease-in-out",
          "&:before": {
            content: '" "',
            position: "absolute",
            top: "0",
            left: "0",
            width: "calc(3.2rem)",
            height: "calc(3.2rem)",
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: "calc(3.2rem / 2)",
            boxSizing: "border-box",
            backgroundColor: theme.palette.white.main
          }
        },
        "& .labels": {
          position: "absolute",
          top: "0.3rem",
          left: "0",
          width: "100%",
          height: "100%",
          fontSize: "1.3rem",
          fontWeight: "700",
          lineHeight: "2.7rem",
          "&:after": {
            content: `'${panelopen}'`,
            position: "absolute",
            right: "0.8rem",
            color: theme.palette.white.main,
            opacity: "1"
          },
          "&:before": {
            content: `'${paneloff}'`,
            position: "absolute",
            left: "0.65rem",
            color: theme.palette.blue.main,
            opacity: "1"
          }
        },
        "& input": {
          position: "absolute",
          left: "50%",

          "&:checked + .slider": {
            backgroundColor: theme.palette.blue.main
          },
          "&:checked + .slider::before": {
            transform: "translateX(calc(6.4rem - 3.2rem))"
          },
          "&:checked ~ .labels:after": {
            opacity: "1",
            color: theme.palette.blue.main
          },
          "&:checked ~.labels:before": {
            opacity: "1",
            color: theme.palette.white.main
          }
        }
      }
    })
);
