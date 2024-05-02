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
  const [getOne, setGetOne] = useState({});
const [loaderIn, setLoaderIn] = useState(false)
  const {user,setUser} = useContext(UserDataInContext)
  const URL=import.meta.env.VITE_BACKEND||"http://localhost:4000";
const goSomewhere=(e, where)=>{
navigate(where)
}
  function getOneUser(user, state) {
setLoaderIn(true)
    fetch(`${URL}/one-user`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then((json) => {
        state(json);
        
        setUser(json)

      let inUser={_id:json._id}
         localStorage.setItem("in", JSON.stringify(inUser));
           navigate("/");
          
     
      })
      .catch((err) => {
        console.log(err);
        setFound(true);

      })
      .finally(()=>{
        setLoaderIn(false)
        setTimeout(() => {
          setFound(false)
        }, 2000);
      })
      
  }

  useEffect(() => {
 

    if (login) {
      getOneUser(login, setGetOne);
    }
  }, [login]);

  return (
    <main className="main-login">
      <h1>Iniciar sesión</h1>
      <div className="contaiter-form">
{!loaderIn && <Form_User Status={setLogin}  nameBtn={"Iniciar sesión"}/>}
   {loaderIn&&<Loader_Form/>}
</div>
      <div className="failed">{found && <p>This acount doesn't exist</p>}</div>
      <button onClick={(e)=>goSomewhere(e,"/signup")} className="login-btn">Crear Cuenta</button>
    </main>
  );
}

export default Login;
