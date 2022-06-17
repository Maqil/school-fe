import React from "react";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../../providers/Auth";
const Logout = () => {
  const user = useAuth();

  React.useEffect(() => {
    
    // prepare alert message
    const response = {
      showAlert: true,
      severity: "success",
      message: "all.alert.logout"
    };
    sessionStorage.setItem("alertMessage", JSON.stringify(response));

    window.location.href.replace("login", "");
    user.signOut();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <CircularProgress size={60} />
        </div>
      </div>
    </>
  );
};

export default Logout;
