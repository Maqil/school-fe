import React, { useEffect, useState } from "react";
import { getI18n, useTranslation } from "react-i18next";
import schoolLogo from "../../assets/images/vector.svg";
import hamburger from "../../assets/images/hamburger-icon.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { FormControl, Collapse, Typography, Button } from "@mui/material";
import { useAuth } from "../../providers/Auth";
import { useCustomer } from "../../providers/CustomerProvider";
import {
  HeaderButton,
  MainContainerMenu,
  MainLeftNav,
  SideRightNavItem,
  MainLeftNavItemHref,
  MainLeftNavItemLi,
  MainLeftNavItemUL,
  MainRightNav,
  MainRightNavItem,
  SideNavContainer,
  SideRightNavItemUL,
  SideRightNavItemLi,
  BoldLine,
  SideNavFooterContainer,
  PopoverDiv,
  MenuHamburgerButton,
  LogoWrapper,
  GreetingDiv,
  MainContainerDiv,
  PopOverPaper,
  DrawerPaper,
  MainWrapper,
  SideNavFooterContent,
  FooterLinks,
  SideDrawer,
  LanguageContainer
} from "../Header/Header.style";

function Header() {
  const user = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [userInitial, setUserInitial] = React.useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuSignOut = e => {
    e.preventDefault();

    // prepare alert message
    const response = {
      showAlert: true,
      severity: "success",
      message: "all.alert.logout"
    };
    sessionStorage.setItem("alertMessage", JSON.stringify(response));
    window.location.href.replace("login", "");
    user.signOut();
    toggleDrawer(false);
    handleClose();
  };

  const openMenu = Boolean(anchorEl);
  const id = openMenu ? "simple-popover" : undefined;

  const [sideNav, setSideNav] = React.useState(false);
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSideNav(open);
  };
  const { customerData, loading } = useCustomer();
  //Get User FirstName and LastName
  const userFullName =
    (customerData[0]?.firstName
      ? customerData[0]?.firstName?.charAt(0).toUpperCase() +
        customerData[0]?.firstName?.slice(1)
      : "") +
    " " +
    (customerData[0]?.lastName
      ? customerData[0]?.lastName?.charAt(0).toUpperCase() +
        customerData[0]?.lastName?.slice(1)
      : "");

  if (typeof userFullName === "string") {
    if (customerData[0]?.firstName && customerData[0]?.lastName) {
      // save first and last name in the local storage
      sessionStorage.setItem("firstName", customerData[0]?.firstName);
      sessionStorage.setItem("lastName", customerData[0]?.lastName);
      localStorage.setItem("firstName", customerData[0]?.firstName);
      localStorage.setItem("lastName", customerData[0]?.lastName);
    }
  }
  const { t } = useTranslation();
  const initial = (t("all.header.button.btn-initial-profile-logged-in") +
    userFullName +
    t("all.header.button.btn-initial-profile-click-profile")) as
    | string
    | undefined;

  const { i18n } = useTranslation();
  //For Languge
  const [langValue, setLangValue] = useState(getI18n().resolvedLanguage);

  const onLangSwitch = e => {
    sessionStorage.setItem("language", e.target.checked ? "fr" : "en");
    setLangValue(e.target.checked ? "fr" : "en");
    window.location.reload();
  };
  useEffect(() => {
    console.log('loading', loading);
    i18n.changeLanguage(langValue, (err, t) => {
      if (err)
        return console.debug(
          "ERROR: header had something went wrong loading",
          err
        );
      t("key");
      document.documentElement.lang = getI18n().resolvedLanguage;
    });
  }, [i18n, langValue, loading]);


  useEffect(() => {
    if (user.user && !user.loading) {
      let username = user.user?.sub;
      let initials = username!.charAt(0) + username?.split(".")[1].charAt(0);
      setUserInitial(initials.toUpperCase());
    }
  }, [user]);

  //Set css class based on condition
  var languageclass,
    profileClass,
    hamIconclass = "";
  if (user.user != null) {
    languageclass = "language-hide";
    hamIconclass = "hamIconShow";
    profileClass = "profile-show";
  } else {
    languageclass = "language-show";
    hamIconclass = "hamIconHide";
    profileClass = "profile-hide";
  }
  return (
    <>
      <MainWrapper>
        <MainContainerDiv>
          <MainContainerMenu>
            {/* LeftSide menu item */}
            <MainLeftNav>
              <div className="logo-wrapper">
                <img src={schoolLogo} alt="Rivo" />
              </div>
            </MainLeftNav>
            {/* Rightside menu item */}
            <MainRightNav>
              <MainRightNavItem>
                {/* <Collapse in={user.user !== null}>
                  <div className="main-left-nav-item">
                    <MainLeftNavItemUL>
                      <MainLeftNavItemLi>
                        <MainLeftNavItemHref
                          className="main-menu"
                          href="./shipments-dashboard"
                        >
                          {" "}
                          {t("all.header.link.shipment-list")}
                        </MainLeftNavItemHref>
                      </MainLeftNavItemLi>
                      <MainLeftNavItemLi>
                        <MainLeftNavItemHref
                          className="main-menu"
                          href="./contact"
                        >
                          {t("all.header.link.got-an-issue")}
                        </MainLeftNavItemHref>
                      </MainLeftNavItemLi>
                    </MainLeftNavItemUL>
                  </div>
                </Collapse> */}

                <div className={languageclass}>
                  <LanguageContainer panelopen="FR" paneloff="EN">
                    <label className="lang-toggle">
                      <input
                        type="checkbox"
                        checked={langValue === "fr" ? true : false}
                        onChange={onLangSwitch}
                        tabIndex={0}
                        aria-label={t("all.header.sr.language-menu")}
                      />
                      <span className="slider"></span>
                      <span className="labels" aria-hidden="true"></span>
                    </label>
                  </LanguageContainer>
                </div>
                <div className={profileClass}>
                  <Collapse in={user.user !== null}>
                    <GreetingDiv>
                      {/* {loading ? (
                        <HeaderButton>
                          <PersonOutlineIcon
                            sx={{ fontSize: "3rem" }}
                          ></PersonOutlineIcon>
                        </HeaderButton>
                      ) : ( */}
                        <HeaderButton
                          tabIndex={0}
                          aria-label={initial}
                          sx={{
                            "&:hover": {
                              backgroundColor: "White",
                              boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.75)"
                            },
                            "&:focus-visible": {
                              backgroundColor: "White",
                              boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.75)"
                            }
                          }}
                          color="secondary"
                          onClick={handleClick}
                        >
                          {userInitial}
                        </HeaderButton>
                      {/* )} */}
                    </GreetingDiv>
                    <PopoverDiv
                      id={id}
                      open={openMenu}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                    >
                      <PopOverPaper>
                        <HeaderButton
                          sx={{ border: "1px solid #EBE7E6" }}
                          color="secondary"
                          aria-describedby={id}
                        >
                          {userInitial}
                        </HeaderButton>
                        <div className="profile-name">{userFullName}</div>
                      </PopOverPaper>
                      <BoldLine></BoldLine>
                      <MainLeftNavItemUL
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <MainLeftNavItemLi>
                          <Link
                            className="menu-action"
                            onClick={handleClose}
                            to="./view-profile"
                          >
                            <PersonOutlineIcon
                              sx={{ fontSize: "2rem" }}
                            ></PersonOutlineIcon>
                            <span className="menu-text" aria-label="profile">
                              {t("all.header.link.profile")}
                            </span>
                          </Link>
                        </MainLeftNavItemLi>
                        <MainLeftNavItemLi
                          sx={{ paddingTop: "5px", paddingBottom: "0" }}
                        >
                          <Button
                            disableRipple
                            disableFocusRipple
                            variant="text"
                            className="menu-action"
                            onClick={handleMenuSignOut}
                          >
                            <LogoutIcon
                              sx={{
                                fontSize: "2rem",
                                transform: "rotate(180deg)"
                              }}
                            ></LogoutIcon>
                            <span className="menu-text">
                              {t("all.header-link.logout")}
                            </span>
                          </Button>
                        </MainLeftNavItemLi>
                      </MainLeftNavItemUL>
                    </PopoverDiv>
                  </Collapse>
                </div>
              </MainRightNavItem>
              <div className={hamIconclass}>
                <Collapse in={user.user !== null}>
                  <MenuHamburgerButton onClick={toggleDrawer(true)}>
                    <img src={hamburger} alt="" width="100%" height="100%" />
                  </MenuHamburgerButton>
                </Collapse>
              </div>
            </MainRightNav>
          </MainContainerMenu>
          {/* SideHamburger menu item(mobile and desktop) */}
          <Collapse in={user.user !== null}>
            <SideNavContainer>
              <SideDrawer
                anchor="right"
                open={sideNav}
                onClose={toggleDrawer(false)}
              >
                <DrawerPaper>
                  <LogoWrapper>
                    <img src={schoolLogo} alt="Rivo" />
                  </LogoWrapper>
                  <CloseIcon
                    className="close-icon"
                    onClick={toggleDrawer(false)}
                  ></CloseIcon>
                </DrawerPaper>
                <SideRightNavItem>
                  <div className="side-profile-item">
                    <div className="side-profile">
                      <HeaderButton
                        className="user-icon"
                        sx={{ border: "1px solid #EBE7E6" }}
                        color="secondary"
                        aria-describedby={id}
                      >
                        {userInitial}
                      </HeaderButton>{" "}
                      {userFullName}
                    </div>
                    <div className="side-profile">
                      <Button
                        className="side-btn-profile"
                        variant="outlined"
                        onClick={() =>
                          (window.location.href = "./view-profile")
                        }
                      >
                        {t("all.header.link.profile")}
                      </Button>{" "}
                      <Button
                        className="side-btn-profile"
                        variant="outlined"
                        onClick={handleMenuSignOut}
                      >
                        {t("all.header-link.logout")}
                      </Button>
                    </div>
                    <li className="side-profile-line">
                      <div className="side-bold-line"></div>
                    </li>
                  </div>

                  <SideRightNavItemUL>
                    <SideRightNavItemLi>
                      <MainLeftNavItemHref
                        className="side-menu-text"
                        href="./shipments-dashboard"
                      >
                        {t("all.header.link.shipment-list")}{" "}
                      </MainLeftNavItemHref>
                      <BoldLine></BoldLine>
                    </SideRightNavItemLi>
                    <SideRightNavItemLi>
                      <MainLeftNavItemHref
                        className="side-menu-text"
                        href="./contact"
                      >
                        {" "}
                        {t("all.header.link.got-an-issue")}{" "}
                      </MainLeftNavItemHref>
                      <BoldLine></BoldLine>
                    </SideRightNavItemLi>
                  </SideRightNavItemUL>

                  <SideNavFooterContainer>
                    <SideNavFooterContent>
                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <div className="side-lang">
                          <LanguageContainer panelopen="FR" paneloff="EN">
                            <label className="lang-toggle">
                              <input
                                type="checkbox"
                                checked={langValue === "fr" ? true : false}
                                onChange={onLangSwitch}
                                tabIndex={0}
                                aria-label={t("all.header.sr.language-menu")}
                              />
                              <span className="slider"></span>
                              <span
                                className="labels"
                                aria-hidden="true"
                              ></span>
                            </label>
                          </LanguageContainer>
                        </div>
                      </FormControl>
                      <BoldLine> </BoldLine>
                      <FooterLinks>
                        <Typography
                          component="a"
                          color="black.main"
                          href={`${process.env.REACT_APP_SMARTKARGO_BASE_URL}privacy-policy`}
                          target="_blank"
                        >
                          {t("all.footer.link.privacy-policy")}
                        </Typography>
                        <Typography
                          component="a"
                          color="black.main"
                          href={`${process.env.REACT_APP_SMARTKARGO_BASE_URL}terms-of-use`}
                          target="_blank"
                        >
                          {t("all.footer.link.terms-of-use")}
                        </Typography>
                        <Typography
                          component="a"
                          color="black.main"
                          href={`${process.env.REACT_APP_SMARTKARGO_BASE_URL}cookie-policy`}
                          target="_blank"
                        >
                          {t("all.footer.link.cookies-policy")}
                        </Typography>
                      </FooterLinks>
                    </SideNavFooterContent>
                  </SideNavFooterContainer>
                </SideRightNavItem>
              </SideDrawer>
            </SideNavContainer>
          </Collapse>
        </MainContainerDiv>
      </MainWrapper>
    </>
  );
}
export default Header;
