import React from "react"

export default function InputArea(props) {
    return (
        <input 
        type="text" 
        onChange={props.handleChange}
        value={props.inputItem}
      />
    )
}