import { createContext, useContext, useState } from "react";
import { DeckContext } from "./DecksContext";


const StudyTodayContext=createContext();



const StudyTodayContextProvider=({children})=>{

   
  
    const [studyToday,setStudyToday]=useState([]);
    const [i,setI]=useState(0);
    const [focus,setFocus]=useState({});
    const [showAnswer,setAnswer]=useState(false);
    //FOCUS ON ONE
    const showCardFocusOn=({id,decks})=>{
        const deck=decks.find(d=> d.id===(parseInt(id)));
        let {name,cards}=deck; 
        //EL PROBLEMA ES STUDYTODAY
        //   console.log(today, "from showCardFocusOn FOR STUDY VARIABLE STUDY")
        
   
         setFocus(studyToday[i]);
        setAnswer(false);
          setI((prev)=>{
              console.log(prev,"prev");
              if(prev>= studyToday.length) {
              setFocus(studyToday[0])
               return 0
             }
              return prev +1
          
          });
        }

const data={studyToday,setStudyToday,focus,setFocus,i,setI,showAnswer,setAnswer,showCardFocusOn};


return <StudyTodayContext.Provider value={data}>{children}</StudyTodayContext.Provider>

}



export default StudyTodayContextProvider;

export {StudyTodayContext};