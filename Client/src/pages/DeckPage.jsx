import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DeckContext } from '../Context/DecksContext'

import "./DeckPage.css"
import StudyView from '../Components/StudyView';
import CreateView from '../Components/CreateView';
import { StudyTodayContext } from '../Context/StudyTodayContext';
import { FechRequest } from '../Helper/FetchRequest';

function DeckPage() {

    useEffect(() => {
        const root = document.documentElement;
        const color_user = localStorage.getItem('color');
        root.style.setProperty('--main-color', color_user);
      }, []);

      //CONTEXTS
    const {decks,validate,setDeck}=useContext(DeckContext);
const {studyToday,setStudyToday,showCardFocusOn}=useContext( StudyTodayContext)
const inU=JSON.parse(localStorage.getItem("in"));
    //----------------
    //MODASLS
    const [study,setStudy]=useState(false)
   const [create,setCreate]=useState(false)
   const URL=import.meta.env.VITE_BACKEND||"http://localhost:4000";
   //-------
  // const [i,setI]=useState(0);
  //ID DECK
    const {id}=useParams();
    // const [showAnswer,setAnswer]=useState(false);

 const NewCardToCurrentDeck=({card})=>{

 const newDecks=decks.map(d => d.id===parseInt(id)? {...d,cards:[...d.cards,card]}:d);
 const addNewCard=async()=>{
await  FechRequest.createOneCard(`http://localhost:4000/decks/cards/${inU._id}/${id}`,card);
 };

 addNewCard();

setDeck(newDecks) 
 }
 const deck=decks.find(d=> d.id===(parseInt(id)));
 const UpdateDeckCards=({front,nextTime,id,cardID,lastReviewDate})=>{

//ADD AN ID TO ALL CARDS
  let dCards=cards.map(c=> c.id===cardID?{...c,nextTime:nextTime}:c);
const UpdateTimeDeck=decks.map(d=> d.id===parseInt(id)?{...d,cards:dCards}:d);
const UpdateTime=async()=>{
  id=parseInt(id);

  console.log("user",inU._id);
  console.log("Decks",id)
  console.log("card",cardID)

  await  FechRequest.updateCardOne(`${URL}/decks/cards/${inU._id}/${id}/${cardID}`,{nextTime,lastReviewDate});
   };
UpdateTime();
  setDeck(UpdateTimeDeck);
 }

let {name,cards}=deck; 

 let currentDate=new Date();
// let studyToday=[];

//VERIFICAR POR QUE STUDYTODAY NO SE LE AÑADEN LOS OBJETOS
//UTILIZAR LOS BOTONES HAR Y AGAIN


// CADA QUE SE MUESTRE ESTE COMPONENTE CARGAMOS LAS CARTAS A ESTUDIAR
useEffect(()=>{
const today = cards
 .filter((c,i) => {
   let dateCard = new Date(c.nextTime);

   return currentDate >= dateCard;
 });
  setStudyToday(today);

},[])



///  CADA QUE SE ACTUALICE CARDS POR SUS NUEVAS PROPIEDADES DE LOS OBJ, DEBE ACTUALIZAR STUDYTODAY
useEffect(() => {
 const today = cards
 .filter((c,i) => {
   let dateCard = new Date(c.nextTime);
   return currentDate >= dateCard;
 });

setStudyToday(today)
}, [cards])

// const showCardFocusOn=()=>{
// //EL PROBLEMA ES STUDYTODAY
// //   console.log(today, "from showCardFocusOn FOR STUDY VARIABLE STUDY")
// console.log(studyToday, "THIS IS THE LAST ONE");

// console.log("---------------")
//  setFocus(cards[i]);
// setAnswer(false);
//   setI((prev)=>{
//       console.log(prev,"prev");
//       if(prev>= cards.length) {
//       setFocus(cards[0])
//        return 0
//      }
//       return prev +1
  
//   });
// }


// const showCardFocusOn=()=>{
//    // JUST FOR THOSE CURRENTDATE >= NEXTTIME
// cards.forEach((card,i )=> {
//   let dateCard=new Date(card.nextTime);
//  //console.log(dateCard, "from showCads")
//   if(currentDate>= dateCard){
// //studyToday=[...studyToday,card]
//   setStudyToday(prev=>[...prev,card])
//   }
//   //   if(currentDate>= dateCard){
// // setStudyToday([...studyToday,card])
// // console.log(card," from study today")
// // console.log(studyToday," from study today")

// //   }
// });
// console.log(studyToday,"from showcardF")
//   setFocus(cards[i]);
//  setAnswer(false)
//    setI((prev)=>{
//        console.log(prev,"prev");
//        if(prev>= cards.length) {
//        setFocus(cards[0])
//         return 0
//       }
//        return prev +1
   
//    })

 

  
//  }


// const showCardFocusOn=()=>{


//  if(i>= cards.length) setI(0);

//   setFocus(cards[i]);

//   setI((prev)=>{
//       console.log(prev,"prev");
     
//       return prev +1
  
//   })
// console.log(i, "next");
//  console.log(focus,"from Page")
// }

let showCard={
  UpdateDeckCards
}


    return (
    <main className='main-deck-page'>
        

        <Link className='a-back' to="/"><img src="/back.svg" alt="" /></Link>


<div  className='content-deck'>

<article  className='deck-info-v'>
       <h1> {name} </h1>

<h2>Cartas: {cards.length}</h2>
</article>
   

<article className='btns-deck'>

    <button onClick={e=>validate(e,setCreate,create)}   className='btn-add'>Agregar Carta</button>

    <button onClick={e=>{
      validate(e,setStudy,study)
      showCardFocusOn({id,decks})
    
    }} className='btn-study'>Estudiar</button>
</article>

{study&&<StudyView  validate={validate} decks={decks} setSudy={setStudy} study={study} id={id}  showCard={showCard}/> }
{/*ADD NEW CARDS WITH API*/}
{create&& <CreateView  NewCardToCurrentDeck={NewCardToCurrentDeck} validate={validate} create={create} setCreate={setCreate}/>}

</div>
      
    </main>


  )
}

export default DeckPage