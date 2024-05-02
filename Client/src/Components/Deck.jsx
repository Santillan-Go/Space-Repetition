import React from 'react'
import "./Deck.css";
import { Link } from 'react-router-dom';


function Deck({deck}) {
    let {name,cards,image=false,id}=deck;
    let length=cards.length ?cards.length: "0"
  return (
    <article  className='deck-article'>
{image ? <img src={image}></img>:<Link  className='a-deck' to={`/deck/${id}`}> <div  className='not-image'></div></Link> }

<div className='deck-info'>
<h3>{name}</h3>
<h4>{length} Cards</h4>
</div>
    </article>
  )
}

export default Deck