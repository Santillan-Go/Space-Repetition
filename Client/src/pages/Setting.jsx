import { useContext, useEffect, useState } from 'react';
import './Setting.css'
import { UserDataInContext } from '../Context/UserDataIn';
import { useNavigate } from "react-router-dom";



function Setting() {

    const {user,} = useContext(UserDataInContext);
   
    const navigate=useNavigate();
    const [ope,setOpen]=useState(false);
    const [CHANGE, setCHANGE] = useState(false)

    const logOut=(where)=>{
        localStorage.removeItem("in");
    navigate(where)
    }


    const validate=(event,state,currentV)=>{
        if(currentV)  return state(false)
        return state(true)
    }

    const changeColor=e=>{
        const root = document.documentElement;

        const newC=e.target.value; 
       
// Modificar la variable CSS
localStorage.setItem("color",newC);
root.style.setProperty('--main-color', newC);

    }

let username=user.username|| "Carlos";
  return (
    <div  className='settting-main'>
    <div  className='user'>
   <h1 className='username-log'>{username}</h1>
<button onClick={()=>logOut("/login")} className='log-out btn'>Cerrar Sesión</button>
    </div>
  
  
    
   

    <article className={`show-btns`}>
        <button  className='open-btn ' onClick={(e)=>validate(e,setOpen,ope)}>
            <img src="/arrow-down.svg" alt="down" />
        </button>

<h2>Acciones</h2>
    </article>
    <section  className={`functions-btns ${ope?"open":"" }`}>
        <button  onClick={(e)=>validate(e,setCHANGE,CHANGE)}  className={`btns-funtions ${ope?"show-letter":"none"}`}>

            <img  className='bursh-color' src='/brush.svg'></img>
        </button>
      

    </section>

    <section className={`modal-function ${CHANGE?"":"none"}`} >
        <article>
            <div className='main-function'>
                <button className='btn-close' onClick={(e)=>validate(e,setCHANGE,CHANGE)}><img src="/close.svg" alt="" /></button>
                <h3>Selecciona Color:</h3>
<input type="color"  onChange={changeColor} className='input-color'/>

</div>
        </article>


    </section>
    </div>
  )
}

export default Setting