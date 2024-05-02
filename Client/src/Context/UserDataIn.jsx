import { createContext, useState } from "react";



const UserDataInContext=createContext();
//LOGICA PARA EL LOGIN
// Y PARA HACER LA FETICION

const UserDataInProvider=({children})=>{

    const [loader, setLoader] = useState(false)


const [user,setUser]=useState({decks:[]});



    const data={user,setUser,loader,setLoader}
    return <UserDataInContext.Provider value={data}>{children}</UserDataInContext.Provider>

}



export default UserDataInProvider;

export {
    UserDataInContext
}