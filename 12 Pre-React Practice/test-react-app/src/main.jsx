// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// function MyButton(){
//   const [randomNumber, setRandomNumber] = React.useState(0)
//   return (
//     <>
//       <h3>Tekan untuk mendapatkan nomor acak</h3>
//       <button onClick={() => {setRandomNumber(Math.floor(Math.random()*100))}}>
//       {randomNumber}
//     </button>
//     </>
//   )
// }

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <h1>Halo Dunia</h1>
//     <MyButton />
//   </StrictMode>
// )

import React from "react"
import { createRoot } from 'react-dom/client'
// import { useState } from "react"

const hour = new Date().getHours()
const time = hour <= 4 ? 'Dawn' 
  : hour <= 10 ? 'Morning' 
  : hour <= 15 ? 'Afternoon' 
  : hour <= 20 ? 'Evening'
  : 'Night'

const timeColor = hour <= 4 ? 'cyan' 
: hour <= 10 ? 'red' 
: hour <= 15 ? 'green' 
: hour <= 20 ? 'purple'
: 'blue'

const fontColor = {
  color: timeColor
}

createRoot(document.getElementById('root')).render(
  <>
    <h1 style={fontColor}>Good {time}</h1>
  </>
)