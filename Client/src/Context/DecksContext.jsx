import { createContext, useContext, useEffect, useState } from "react";
import { UserDataInContext } from "./UserDataIn";

const DeckContext=createContext();

//AGREGAR DECKS USAN LA API
//AGREGAR CARDS USANDO LA API
// ACTUALIZAR UTILIZANDO LA API
//LOADER
//SIGN UP
//LOG OUT  

//DATA BASE STRUCTURE



// const DATABASE={
//     users:[{
//         username:"Carlos",
//         password:"1986?",
//         id:1,
//         decks:[
//             {
//                 nameDeck:"English||1",
//                 id:1,
//                 cards:[{
//                     id:1,
//                     front:"Mind",
//                     back:"Mente",
//                     nextTime:"2024-04-29",
//                 },
//                 {
//                     id:2,
//                     front:"Run",
//                     back:"Correr",
//                     nextTime:"2024-04-29",
//                 }
//             ]
//             },
//             {
//                 nameDeck:"English||2",
//                 id:2,
//                 cards:[{
//                     id:1,
//                     front:"Literally",
//                     back:"Literalmente",
//                     nextTime:"2024-04-29",
//                 },
//                 {
//                     id:2,
//                     front:"Jelous",
//                     back:"Celoso",
//                     nextTime:"2024-04-29",
//                 }
//             ]
//             }
//         ]
    
//     }
//     ]
// };
// const user={
//     username:"Carlos",
//     password:"1986?",
//     id:1,
//     decks:[
//         {
//             nameDeck:"English||1",
//             id:1,
//             cards:[{
//                 id:1,
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-29",
//             },
//             {
//                 id:2,
//                 front:"Run",
//                 back:"Correr",
//                 nextTime:"2024-04-29",
//             }
//         ]
//         },
//         {
//             nameDeck:"English||2",
//             id:2,
//             cards:[{
//                 id:1,
//                 front:"Literally",
//                 back:"Literalmente",
//                 nextTime:"2024-04-29",
//             },
//             {
//                 id:2,
//                 front:"Jelous",
//                 back:"Celoso",
//                 nextTime:"2024-04-29",
//             }
//         ]
//         }
//     ]

// }

 const mazosStorage=[]
const DeckProvider=({children})=>{

  const {user,setUser}=useContext(UserDataInContext);

  useEffect(() => {
   console.log(user,"FROM DECKCONTEXT USER API")

  }, [user])

  
const mazos=user.decks;
    const validate=(event,state,currentV)=>{
        if(currentV)  return state(false)
        return state(true)
    }


const [decks, setDeck] = useState(mazosStorage);
useEffect(()=>{
setDeck(mazos)
},[user])

    const data={decks,setDeck,validate}
    return <DeckContext.Provider  value={data} >{children}</DeckContext.Provider>
}

export default DeckProvider;

export {DeckContext}





















//   const mazos=[
//         {
//             name:"English",
// id:1,            cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         },
//         {
//             name:"English2",id:2,
//             cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         },
//         {
//             name:"Englis3h",id:3,
//             cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         },
//         {
//             name:"English4",id:4,
//             cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         } , {
//             name:"English",
// id:5,            cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         },
//         {
//             name:"English2",id:6,
//             cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         },
//         {
//             name:"Englis3h",id:7,
//             cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         },
//         {
//             name:"English4",id:8,
//             cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         } , {
//             name:"English",
// id:9,            cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         },
//         {
//             name:"English2",id:10,
//             cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         }
        
//     ]

//     const mazos=[
//         {
//             name:"English",
// id:1,            cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         },
//         {
//             name:"English2",id:2,
//             cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         },
//         {
//             name:"Englis3h",id:3,
//             cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         },
//         {
//             name:"English4",id:4,
//             cards:[{
//                 front:"Mind",
//                 back:"Mente",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             },
//             {
//                 front:"Glass",
//                 back:"Vaso",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//             ,{
//                 front:"Research",
//                 back:"Investigar",
//                 nextTime:"2024-04-25",
//                 good:false,
//                 bad:false,
//                 again:false
//             }
//         ]
//         } ]
