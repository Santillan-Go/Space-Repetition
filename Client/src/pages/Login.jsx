import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import Form_User from "../Components/Form_User";
import { useNavigate } from "react-router";
import { UserDataInContext } from "../Context/UserDataIn";
import Loader_Form from "../Components/Loader_Form";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(null);
  const [found, setFound] = useState(false);

  const [loaderIn, setLoaderIn] = useState(false);
  const { setUser } = useContext(UserDataInContext);
  const URL =
    import.meta.env.VITE_BACKEND || "https://server-henna-ten.vercel.app";
  const goSomewhere = (e, where) => {
    navigate(where);
  };
  function getOneUser(user) {
    setLoaderIn(true);
    fetch(`${URL}/one-user`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        //   console.log("Response status:", res.status);
        if (res.ok) {
          return res.json();
        }
        // If not ok, reject with the response
        throw new Error("User not found");
      })
      .then((json) => {
        //    console.log("Success data:", json);

        setUser(json);
        let inUser = { _id: json._id };
        localStorage.setItem("in", JSON.stringify(inUser));
        navigate("/");
      })
      .catch((error) => {
        // console.error("Error:", error);
        setFound(true);
      })
      .finally(() => {
        setLoaderIn(false);
        setTimeout(() => {
          setFound(false);
        }, 2000);
      });
  }

  const CreateAccountButton = () => (
    <button
      onClick={(e) => goSomewhere(e, "/signup")}
      className="mt-6 w-full max-w-md mx-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm border border-white/10 hover:shadow-lg"
    >
      <span>Create Account</span>
    </button>
  );

  useEffect(() => {
    if (login) {
      getOneUser(login);
    }
  }, [login]);

  return (
    <main className="main-login">
      <h1 className="font-bold text-2xl">Iniciar sesión</h1>
      <div className="contaiter-form">
        {!loaderIn && (
          <Form_User
            Status={setLogin}
            nameBtn={"Iniciar sesión"}
            children={CreateAccountButton()}
          />
        )}
        {loaderIn && <Loader_Form text={"Verificando Cuenta..."} />}
      </div>
      <div className="failed">{found && <p>This acount doesn't exist</p>}</div>
    </main>
  );
}

export default Login;
