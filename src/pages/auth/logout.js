import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("authUser");
    return navigate("/sign-in");
  }, []);
  return <div></div>;
}
