import React, { useState } from "react"
import InputSection from './components/InputSection'
import FormOutput from './components/FormOutput'
import { Container } from '@mui/material'

const App = () => {
  const [cvData, setCvData] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)

  return (
    <Container>
      {!isSubmit && <InputSection onSubmit={setCvData} setVisibility={setIsSubmit}/>}
      {isSubmit && <FormOutput data={cvData} setVisibility={setIsSubmit} />}
    </Container>
  )
}

export default App