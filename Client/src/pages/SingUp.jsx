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

  const goSomewhere = (where) => {
    navigate(where);
  };

  const createUser = async (newUser) => {
    setCreate(true);
    fetch(`${URL}/users`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        // console.log(res);
        if (res.ok) {
          setSuccess(true);
          goSomewhere("/login");
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((json) => {
        setCreate(false);
      })
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
  };

  useEffect(() => {
    if (signup) {
      createUser({ ...signup, _id: Date.now() });
    }
  }, [signup]);

  const getButtonLogIn = () => (
    <button
      onClick={(e) => goSomewhere("/login")}
      className="mt-6 w-full max-w-md mx-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm border border-white/10 hover:shadow-lg"
    >
      <span>Iniciar session</span>
    </button>
  );

  return (
    <main className="main-signUp">
      <h1 className="font-bold text-2xl">Crear Cuenta</h1>

      <div className="contaiter-form">
        {create ? (
          <Loader_Form text={"Creando Cuenta..."} />
        ) : (
          <Form_User
            Status={setSignup}
            nameBtn={"Crear Cuenta"}
            children={getButtonLogIn()}
          />
        )}
      </div>
      {/*FINISH COMPONEN FORM*/}
      <div className="success">
        {success && <p> Cuenta Creada Con exitó </p>}
        {error && <p className="text-red-500">Este usuario ya existe</p>}
      </div>
    </main>
  );
}

export default SingUp;
