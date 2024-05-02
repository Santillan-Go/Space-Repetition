import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { route } from './router'
import { RouterProvider } from 'react-router-dom'
import DeckProvider from './Context/DecksContext'
import StudyTodayContextProvider from './Context/StudyTodayContext'
import UserDataInProvider from './Context/UserDataIn'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <UserDataInProvider> <DeckProvider >  <StudyTodayContextProvider><RouterProvider router={route} />     </StudyTodayContextProvider>  </DeckProvider> </UserDataInProvider>
  
  
  </React.StrictMode>,
)
