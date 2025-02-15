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
  const [contact, setContact] = React.useState({
    fName: "",
    lName: "",
    email: ""
  })

  function handleNameChange(event) {
    const {value, name} = event.target
    setContact((prevValue) => {
      return name === 'fName' ?
      {fName: value, lName: prevValue.lName, email: prevValue.email} :
      name === 'lName' ?
      {fName: prevValue.fName, lName: value, email: prevValue.email} :
      {fName: prevValue.fName, lName: prevValue.lName, email: value}
    })
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>
        {contact.email}
      </p>
      <form
        // onSubmit={changeHeadingName}
      >
        <input 
          name="fName"
          type="text" 
          placeholder="First Name" 
          onChange={handleNameChange}
          value={contact.fName}
        />
        <input 
          name="lName"
          type="text" 
          placeholder="Last Name" 
          onChange={handleNameChange}
          value={contact.lName}
        />
        <input 
          name="email"
          type="text" 
          placeholder="Email" 
          onChange={handleNameChange}
          value={contact.email}
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