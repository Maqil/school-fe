import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../providers/Auth";
import Loader from "../Loader/Loader";

const PrivateRoute = () => {
  const auth = useAuth();
  const [state, setState] = useState({});
  useEffect(() => {
    const fetchState = async () => {
      await auth.checkSessionExpired();
      setState(JSON.parse(sessionStorage.getItem("alertMessage") || "{}"));
    };
    fetchState();
  }, [auth.user]);

  if (auth.user) {
    console.log("user exists",auth.user);
  } else {
    console.log("user not found");
  }

  if (auth.loading) return <Loader />;
  return auth.user ? <Outlet /> : <Navigate to="/login" state={state} />;
};

export default PrivateRoute;
