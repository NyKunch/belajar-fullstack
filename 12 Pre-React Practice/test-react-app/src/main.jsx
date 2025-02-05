import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react"
import { createRoot } from 'react-dom/client'
import { useState } from "react"


function MyButton(){
  const [randomNumber, setRandomNumber] = useState(0)
  return (
    <>
      <h3>Tekan untuk mendapatkan nomor acak</h3>
      <button onClick={() => {setRandomNumber(Math.floor(Math.random()*100))}}>
      {randomNumber}
    </button>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Halo Dunia</h1>
    <MyButton />
  </StrictMode>
)