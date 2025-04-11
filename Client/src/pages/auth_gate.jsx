import React, { useState } from "react";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import Main from "./Main";
import SingUp from "./SingUp";

function Auth_gate() {
  const inUser = JSON.parse(localStorage.getItem("in")) || "";
  const [loader, setLoader] = useState(true);

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const goToPage = (e, where) => {
    navigate(where);
  };
  //!inUser
  return inUser ? <Main /> : <SingUp />;
}

export default Auth_gate;
