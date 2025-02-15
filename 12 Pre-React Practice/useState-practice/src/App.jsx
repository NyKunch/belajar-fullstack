import React from "react"

export default function App() {
  // const [name, setName] = React.useState("")
  // const [headingName, setHeadingName] = React.useState()
  // function changeName(event) {
  //   setName(event.target.value)
  // }
  // function changeHeadingName(event) {
  //   setHeadingName(name)
  //   event.preventDefault()
  // }
  const [fullName, setFullName] = React.useState({
    fName: "",
    lName: ""
  })

  function handleNameChange(event) {
    const {value, name} = event.target
    setFullName((prevValue) => {
      return name === 'fName' ?
      {fName: value, lName: prevValue.lName} :
      {fName: prevValue.fName, lName: value} 
    })
  }

  return (
    <div className="container">
      <h1>
        Hello {fullName.fName} {fullName.lName}
      </h1>
      <form
        // onSubmit={changeHeadingName}
      >
        <input 
          name="fName"
          type="text" 
          placeholder="First Name" 
          onChange={handleNameChange}
          value={fullName.fName}
        />
        <input 
          name="lName"
          type="text" 
          placeholder="Last Name" 
          onChange={handleNameChange}
          value={fullName.lName}
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