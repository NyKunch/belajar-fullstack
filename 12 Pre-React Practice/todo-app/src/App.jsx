import React from "react";
import ToDoList from "./ToDoList"
import InputArea from "./InputArea"

export default function App() {
  const [listItem, setListItem] = React.useState([])

  function buttonClick(inputItem) {
    setListItem(prevValue => 
      [...prevValue, inputItem]
    )
  }

  function deleteItem(id) {
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
        <InputArea 
          onAdd={buttonClick}
        />
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