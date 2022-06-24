import React, { useEffect } from "react";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppWrapper, MainContainer } from "./App.style";
import { useAuth } from "../../providers/AuthenticationProvider";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import PageNotFound from "../../components/PageNotFound/PageNotFound";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ChangePassword from "../ChangePassword/ChangePassword";
import ShipmentsDashboard from "../ShipmentsDashboard/ShipmentsDashboard";
import { AppContextProvider } from "./AppContextProvider";
import ViewProfile from "../ViewProfile/ViewProfile";
import { useApiError } from "../../providers/ApiErrorProvider";
import AcErrorDialog from "../../components/AcErrorDialog/AcErrorDialog";
import { useIdleTimer } from 'react-idle-timer'

function App() {
  const auth = useAuth();
  const apiError = useApiError();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const loginPages = ["/login", "/forgot-password"];

  const handleOnIdle = async () => {
    if (!auth.loading && auth.user !== null && !loginPages.includes(pathName)) {
      sessionStorage.removeItem("expiry");
  
      let response = {
        showAlert: true,
        severity: "error",
        message: "all.alert.session-expired"
      };
      sessionStorage.setItem("alertMessage", JSON.stringify(response));
      await auth.signOut();
    }
  }

  // const handleOnAction = (e) => {
  //   let currentTime = Math.floor(Date.now() / 1000);
  //   const expiryTime =  Number(sessionStorage.getItem("expiry")) || null;
  //   if (!user.loading && user.user !== null && !loginPages.includes(pathName)) {
  //     if (expiryTime && (expiryTime - currentTime <= 300)) {
  //       user.checkSessionExpired();
  //     }
  //   }
  // }

  useIdleTimer({
    timeout: 10 * 60 * 1000,
    onIdle: handleOnIdle,
    // onAction: handleOnAction,
    events: ["mousedown"]
  })
  

  useEffect(() => {
    const loginPages = ["/login", "/forgot-password"];
    auth.checkSessionExpired();
    if (!auth.loading && auth.user?.sub === undefined && !loginPages.includes(pathName)) {
      const state = JSON.parse(sessionStorage.getItem("alertMessage") || "{}");
      navigate("/login", { state: state });
    } else if (
      !auth.loading &&
      auth.user?.role !== undefined &&
      loginPages.includes(pathName)
    ) {
      navigate("/shipments-dashboard");
    }
  }, [navigate, auth, pathName]);

  return (
    <>
      <AppContextProvider>
        <AppWrapper className="App">
          <Header />
          {apiError.error ? <AcErrorDialog errorCode={apiError.error} /> : ""}
          <MainContainer className="App">
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/change-password" element={<PrivateRoute />}>
                <Route path="" element={<ChangePassword />} />
              </Route>
              <Route path="/shipments-dashboard" element={<PrivateRoute />}>
                <Route path="" element={<ShipmentsDashboard />} />
              </Route>
              <Route path="/view-profile" element={<PrivateRoute />}>
                <Route path="" element={<ViewProfile />} />
              </Route>
            </Routes>
          </MainContainer>
          <Footer />
        </AppWrapper>
      </AppContextProvider>
    </>
  );
}

export default App;
