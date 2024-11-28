import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout({ children, authentictions = true }) {
  const userstatus = useSelector((state) => state.user.status);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userstatus,authentictions);
    if (authentictions && userstatus !== authentictions) {
      navigate("/login");
    } else if(!authentictions && userstatus !== authentictions) {
      navigate("/");
    }
    setLoading(false);
  }, [userstatus, navigate, authentictions]);
  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
