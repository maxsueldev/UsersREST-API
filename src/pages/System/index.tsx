import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect } from "react";

const System = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      navigate("/login");
    }
  }, [navigate]);

  return <Header />;
};

export default System;
