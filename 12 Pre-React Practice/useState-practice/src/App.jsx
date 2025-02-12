import React from "react"

export default function App() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString())

  function updateTime(){
    setTime(new Date().toLocaleTimeString())
  }

  setInterval(updateTime, 1000)

  return (
    <>
      <h1>
        {time}
      </h1>
    </>
  )
}