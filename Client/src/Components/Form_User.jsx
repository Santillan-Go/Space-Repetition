import React, { useState } from 'react'

import "./Form_User.css";

const initial={
    username:"",
    password:""
};

function Form_User({Status,nameBtn}) {


const [user,setUser]=useState(initial);

const [password,setPassword]=useState(false);


    const handleChange=(e)=>{

setUser(()=>{

    
   return  {...user,
[e.target.name]:e.target.value
}
});



    }


const click=(e)=>{

    if(password){
         setPassword(false);
    }else{
        setPassword(true);
    }
   
}


    const handleSubmit=(e)=>{


        e.preventDefault();
    
        if(user.username && user.password) {Status(user) 
            console.log(user)}
    setUser(initial);
    
    }
  return (
    

<form onSubmit={handleSubmit}  className='data-user-form'>

<div  className='both-inputs'>
<input type="text" name='username'placeholder='username' autoComplete='off'  className='username'  onChange={handleChange} value={user.username}/>

<div className='see-password-input'>
    <input type={password?"text":"password"} name='password'  autoComplete='off' placeholder='password'  className='password'  onChange={handleChange}  value={user.password}/>
<button type='button' className='show-psw'   onClick={click}>👁️</button>
</div>



</div>

<input type="submit"  className='send-data'  value={nameBtn} disabled={user.username&& user.password?"":"disabled"}/>


</form>


  )
}

export default Form_User