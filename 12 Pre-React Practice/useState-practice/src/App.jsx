import React from "react"

export default function App() {
  const [name, setName] = React.useState("")
  const [headingName, setHeadingName] = React.useState()

  function changeName(event) {
    setName(event.target.value)
  }

  function changeHeadingName(event) {
    setHeadingName(name)
    event.preventDefault()
  }

  return (
    <div className="container">
      <h1>
        Hello {headingName}
      </h1>
      <form
        onSubmit={changeHeadingName}
      >
        <input 
          type="text" 
          placeholder="What's your name?" 
          onChange={changeName}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}




// export default function App() {
//   const [time, setTime] = React.useState(new Date().toLocaleTimeString())

//   function updateTime(){
//     setTime(new Date().toLocaleTimeString())
//   }

//   setInterval(updateTime, 1000)

//   return (
//     <>
//       <h1>
//         {time}
//       </h1>
//     </>
//   )
// }