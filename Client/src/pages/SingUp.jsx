import React, { useEffect, useState } from "react";
import Form_User from "../Components/Form_User";
import "./SignUp.css";
import { useNavigate } from "react-router";

function SingUp() {
  const [signup, setSignup] = useState("");
  const [success, setSuccess] = useState(false);
const URL=import.meta.env.VITE_BACKEND||"http://localhost:4000";
  const navigate = useNavigate();

  const goSomewhere=(e, where)=>{
    navigate(where)
    }

  const createUser = async (newUser) => {
    
     fetch(`${URL}/user`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newUser),
    })

    .then(res=> {

if(res.ok){
  setSuccess(true)
return res.json()
 
}else{
  return Promise.reject(res)
}

    })
    .then(json=>console.log(json))

    .catch(err=>{

      console.log(err)
    })
    .finally(()=>{
      setTimeout(() => {
        setSuccess(false)
        //navigate("/login");
      }, 1500);
    })


  
  };

  useEffect(() => {
    if (signup) {

      createUser(signup)
      // const users = JSON.parse(localStorage.getItem("users")) || [];
      // localStorage.setItem("users", JSON.stringify([...users, signup]));
      // setTimeout(() => {
      //   setSuccess(true);
      // }, 2000);

      // setTimeout(() => {
      //   setSuccess(false);
      //   navigate("/login");
      // }, 4000);
    }
  }, [signup]);

  return (
    <main className="main-signUp">
      <h1>Crear Cuenta</h1>

<div className="contaiter-form">
   <Form_User Status={setSignup}  nameBtn={"Crear Cuenta"}/>
</div>
   {/*FINISH COMPONEN FORM*/}
      <div className="success">
        {success && <p> Acount Created Successfully! </p>}
      </div>
      <button onClick={(e)=> goSomewhere(e,"/login")} className="login-btn">Iniciar sesion</button>
    </main>
  );
}

export default SingUp;
