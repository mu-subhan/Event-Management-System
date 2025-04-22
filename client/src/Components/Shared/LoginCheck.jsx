import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
const LoginCheck = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      // If user is logged in, send them back to the page they came from
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    }
  }, [user]);

  return !user ? <Outlet /> : null;
};

export default LoginCheck;
