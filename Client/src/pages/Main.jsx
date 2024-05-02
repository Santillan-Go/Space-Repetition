import React, { useContext } from 'react'

import "./Main.css";
import Deck from '../Components/Deck';
import { DeckContext } from '../Context/DecksContext';



function Main() {

const {decks} =useContext(DeckContext);


console.log(decks, "From main")
  return (
    <>
    <section className="decks-quantity-h">

        <h2>DECKS: {decks.length}</h2>

        <div  className='log'>
            <img src="/brain.png" alt="" />
        </div>
    </section>
    
{/* <h2 className='title-decks'>  Decks</h2> */}
    <section  className={`decks-main ${decks.length>=4 ? "":"full-viewport"}`}>

{decks.length>0 ? decks.map((d,i)=>   <Deck key={i} deck={d}/>):<h2  className='no-decks'>No tienes mazos creados</h2>}
    </section>

   
    </>
  )
}

export default Main