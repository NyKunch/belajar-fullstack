import React from "react";
import ToDoList from "./ToDoList"

export default function App() {
  const [inputItem, setInputItem] = React.useState("")
  const [listItem, setListItem] = React.useState([])

  function handleChange(event) {
    setInputItem(event.target.value)
  }

  function buttonClick() {
    setListItem(prevValue => 
      [...prevValue, inputItem]
    )
    setInputItem("")
  }

  function deleteItem() {
    setListItem(prevItems => {
      return prevItems.filter(
        (item, index) => {
          return index !== id
        }
      )
    })
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input 
          type="text" 
          onChange={handleChange}
          value={inputItem}
        />
        <button
          onClick={buttonClick}
        >
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {listItem.map((item, index) => 
            <ToDoList 
              key={index} 
              id={index}
              listTitle={item} 
              onChecked={deleteItem}
            />
          )}
        </ul>
      </div>
    </div>
  );
}