import React, { useEffect, useState } from 'react'
import "./CreateView.css";
const initialForm={
    front:"",
    back:"",
    nextTime:"",
    lastReviewDate:""
}
function CreateView({validate,setCreate,create,NewCardToCurrentDeck}) {
 
 const [card,setCard]=useState(initialForm);

const handleChange=e=>{
    setCard({...card,
    [e.target.name]:e.target.value
})
}

 const handleForm=e=>{
const nextTime=new Date();
    e.preventDefault();
    if(!card.front ||!card.back) return;
    //MANEJAR EL ESTADO, CORREJIR ESTO
    card.nextTime=nextTime;
    card.id=Date.now()
    NewCardToCurrentDeck({card});
setCard(initialForm)
 }
 
    return (
    
    <form className="create-view"  onSubmit={handleForm} >
      

      <div className="card-content box-shadow-1">
        <div className="front-content-card">
          <h2>Frente</h2>
          <textarea onChange={handleChange} value={card.front}  name="front" id="" cols="30" rows="10"></textarea>
          
        </div>


<div className="back-content-card">
          <h2>Atrás</h2>
          <textarea  onChange={handleChange}  value={card.back}  name="back" id="" cols="30" rows="10"></textarea>
          
</div>

      </div>

      <div  className='btns-card-create'>
<button className='save-card' type='submit'>Guardar</button>     
<button onClick={e=> validate(e,setCreate,create)} type='button' className='cancel-card' >Cancelar</button>     

   </div>
    </form>
  )
}

export default CreateView