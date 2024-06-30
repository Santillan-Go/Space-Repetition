import React, { useEffect, useState } from "react";
import Form_User from "../Components/Form_User";
import "./SignUp.css";
import { useNavigate } from "react-router";
import Loader_Form from "../Components/Loader_Form";
//https://server-henna-ten.vercel.app/
function SingUp() {
  const [signup, setSignup] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, seterror] = useState(false);
  const URL =
    import.meta.env.VITE_BACKEND || "https://server-henna-ten.vercel.app";

  const [create, setCreate] = useState(false);
  const navigate = useNavigate();

  const goSomewhere = (e, where) => {
    navigate(where);
  };

  const createUser = async (newUser) => {
    setCreate(true);
    fetch(`${URL}/users`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "same-origin",
      mode: "cors",
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (res.ok) {
          setSuccess(true);

          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((json) => {
        setCreate(false);
        console
          .log(json)

          .catch((err) => {
            setCreate(false);
            seterror(true);
          })
          .finally(() => {
            setCreate(false);

            setTimeout(() => {
              setSuccess(false);
              seterror(false);
              //navigate("/login");
            }, 1500);
          });
      });
  };

  useEffect(() => {
    if (signup) {
      createUser({ ...signup, _id: Date.now() });
    }
  }, [signup]);

  return (
    <main className="main-signUp">
      <h1>Crear Cuenta</h1>

      <div className="contaiter-form">
        {create ? (
          <Loader_Form text={"Creando Cuenta..."} />
        ) : (
          <Form_User Status={setSignup} nameBtn={"Crear Cuenta"} />
        )}
      </div>
      {/*FINISH COMPONEN FORM*/}
      <div className="success">
        {success && <p> Cuenta Creada Con exitó </p>}
        {error && <p>Este usuario ya existe</p>}
      </div>
      <button onClick={(e) => goSomewhere(e, "/login")} className="login-btn">
        Iniciar sesion
      </button>
    </main>
  );
}

export default SingUp;
