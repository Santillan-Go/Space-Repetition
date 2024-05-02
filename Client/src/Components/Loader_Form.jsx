import React from 'react'
import "./Loader_Form.css";
function Loader_Form({text}) {
  return (
    <div className='Loader_Form'>
<img src="/hart.svg" alt="loader_ball" />
<h2>{text}</h2>
    </div>
  )
}

export default Loader_Form