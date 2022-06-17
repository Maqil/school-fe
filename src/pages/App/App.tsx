import React, { useEffect } from "react";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppWrapper, MainContainer } from "./App.style";
import { useAuth } from "../../providers/Auth";
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

function App() {
  const user = useAuth();
  const apiError = useApiError();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  

  useEffect(() => {
    const loginPages = ["/login", "/forgot-password"];
    user.checkSessionExpired();
    if (!user.loading && user.user === null && !loginPages.includes(pathName)) {
      const state = JSON.parse(sessionStorage.getItem("alertMessage") || "{}");
      console.log("if:");
      navigate("/login", { state: state });
    } else if (
      !user.loading &&
      user.user !== null &&
      loginPages.includes(pathName)
    ) {
      console.log("else if:");
      navigate("/shipments-dashboard");
    }
  }, [navigate, user, pathName]);

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
