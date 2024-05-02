import { createContext, useEffect, useState } from "react";
import { FechRequest } from "../Helper/FetchRequest.js";


const UserDataInContext=createContext();
//LOGICA PARA EL LOGIN
// Y PARA HACER LA FETICION
const In={
    username:"",
    password:""
}

const UserDataInProvider=({children})=>{

    const [loader, setLoader] = useState(false)

const [userIn, setUserIn] = useState({

    usernanme: "san",
     password: "Rea111"
 })
const [user,setUser]=useState({decks:[]});
useEffect(()=>{
console.log(user, "from USARDATA CONTEXT")
},[user])


///HERE===>
//ESTO SE DEBE DE HACER DESDE EL FORM USER
// useEffect(()=>{

//     const getUserContext =async()=>{
//         const res=await FechRequest.getOneUser(`http://localhost:4000/one-user`,{method:"GET",headers:{"Content-Type":"application/json"},body:JSON.stringify(userIn)})
    
//     setUser(res)
//     console.log(res, "FROM USERCONTEXT")
//     };
//     getUserContext()
//     //DEEPENDENCIAS DEL ARRAY
// },[])
    const data={user,setUser,loader,setLoader}
    return <UserDataInContext.Provider value={data}>{children}</UserDataInContext.Provider>

}



export default UserDataInProvider;

export {
    UserDataInContext
}