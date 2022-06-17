import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import rivoLogo from "../../assets/images/logo-footer.svg";
import {
  FooterContainer,
  FooterContent,
  FooterFirstDiv,
  FooterSecondDiv,
  FooterThirdDiv,
  FooterLinks
} from "./Footer.style";
import { useAuth } from "../../providers/Auth";

function Footer() {
  const user = useAuth();
  const { t } = useTranslation();
  var currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterContent sx={{ marginTop: "4rem" }}>
        <FooterFirstDiv>
          <img src={rivoLogo} alt="Rivo Logo" />
          <Typography component="h4" sx={{ mb: "2rem" }}>
            {t("all.footer.label.shipping-title-text")}
          </Typography>
          <Typography component="p" sx={{ mb: "3rem" }}>
            {t("all.footer.label.shipping-description-text")}
          </Typography>
        </FooterFirstDiv>
        <FooterSecondDiv>
          {user.user !== null && (
            <FooterLinks>
              <Typography
                component={Link}
                color="white.main"
                to="./shipments-dashboard"
                sx={{ fontWeight: "bold" }}
                target="_parent"
              >
                {t("all.footer.link.shipment-list")}
              </Typography>
              <Typography
                component={Link}
                color="white.main"
                to="./contact"
                sx={{ fontWeight: "bold" }}
                target="_parent"
              >
                {t("all.footer.link.shipment-contact")}
              </Typography>
            </FooterLinks>
          )}
          <FooterLinks>
            <Typography
              component="a"
              color="white.main"
              href={`${process.env.REACT_APP_SMARTKARGO_BASE_URL}privacy-policy`}
              target="_blank"
            >
              {t("all.footer.link.privacy-policy")}
            </Typography>
            <Typography
              component="a"
              color="white.main"
              href={`${process.env.REACT_APP_SMARTKARGO_BASE_URL}terms-of-use`}
              target="_blank"
            >
              {t("all.footer.link.terms-of-use")}
            </Typography>
            <Typography
              component="a"
              color="white.main"
              href={`${process.env.REACT_APP_SMARTKARGO_BASE_URL}cookie-policy`}
              target="_blank"
            >
              {t("all.footer.link.cookies-policy")}
            </Typography>
          </FooterLinks>
        </FooterSecondDiv>
        <FooterThirdDiv>
          <Typography component="p">
            {`${t("all.footer.label.sub-link-copyright")} ${currentYear}`}
          </Typography>
        </FooterThirdDiv>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
