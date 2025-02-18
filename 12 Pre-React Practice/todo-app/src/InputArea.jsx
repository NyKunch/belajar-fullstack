import React from "react"

export default function InputArea(props) {
    const [inputItem, setInputItem] = React.useState("")

    function handleChange(event) {
        setInputItem(event.target.value)
    }

    return (
        <>
            <input 
                type="text" 
                onChange={handleChange}
                value={inputItem}
            />
            <button
                onClick={() => {
                    props.onAdd(inputItem)
                    setInputItem("")
                }}
            >
                <span>Add</span>
            </button>
        </>
    )
}