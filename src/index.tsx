import React from "react";
import ReactDOM from "react-dom";
import Amplify, { Auth } from "aws-amplify";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/system";
import App from "./pages/App/App";
import { AuthProvider } from "./providers/Auth";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme/theme";
import "./assets/i18n/i18n.ts";
import "./globals.css";
import "./fonts.css";
import "./icon-font.css";
import { BrowserRouter } from "react-router-dom";
import { ApiErrorProvider } from "./providers/ApiErrorProvider";
// import { getI18n } from "react-i18next";

if (
  process.env.REACT_APP_ENV_LOADED === "INT" ||
  process.env.REACT_APP_ENV_LOADED === "PROD"
) {
  Amplify.configure({
    Auth: {
      region: process.env.REACT_APP_AWS_REGION,
      identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
      userPoolId: process.env.REACT_APP_AWS_USERPOOL_ID,
      authenticationFlowType: "CUSTOM_AUTH",
      userPoolWebClientId: process.env.REACT_APP_AWS_USERPOOL_WEB_CLIENT_ID
    },
    API: {
      endpoints: [
        {
          name: "another-api",
          endpoint: process.env.REACT_APP_UPLOAD_API_BASE,
          custom_header: async () => {
            return {
              Authorization: `${(await Auth.currentSession())
                .getAccessToken()
                .getJwtToken()}`
            };
          }
        }
      ]
    }
  });
} else {
  Amplify.configure({
    Auth: {
      region: process.env.REACT_APP_AWS_REGION,
      identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
      userPoolId: process.env.REACT_APP_AWS_USERPOOL_ID,
      userPoolWebClientId: process.env.REACT_APP_AWS_USERPOOL_WEB_CLIENT_ID
    },
    API: {
      endpoints: [
        {
          name: "another-api",
          endpoint: process.env.REACT_APP_UPLOAD_API_BASE,
          custom_header: async () => {
            return {
              Authorization: `${(await Auth.currentSession())
                .getAccessToken()
                .getJwtToken()}`
            };
          }
        }
      ]
    }
  });
}
// loadScripts();

// function loadScripts() {
//   // dyntrace
//   const node = document.createElement("script");
//   node.src = `${process.env.REACT_APP_DYNATRACE_SCRIPT}`;
//   node.type = "text/javascript";
//   node.async = true;
//   document.getElementsByTagName("head")[0].appendChild(node);

//   // usabillia
//   let usabillaScriptSrc = "";
//   let mql = window.matchMedia("screen and (min-width: 768px)");
//   if (mql.matches) {
//     usabillaScriptSrc =
//       getI18n().resolvedLanguage === "en"
//         ? "./js/usabilla-desktop-en.js"
//         : "./js/usabilla-desktop-fr.js";
//   } else {
//     usabillaScriptSrc =
//       getI18n().resolvedLanguage === "en"
//         ? "./js/usabilla-mobile-en.js"
//         : "./js/usabilla-mobile-fr.js";
//   }

//   const node2 = document.createElement("script");
//   node2.src = usabillaScriptSrc;
//   node2.type = "text/javascript";
//   node2.async = true;
//   document.getElementsByTagName("head")[0].appendChild(node2);

//   // document language html tag
//   document.documentElement.lang = getI18n().resolvedLanguage;
// }
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ApiErrorProvider>
            <App />
          </ApiErrorProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
