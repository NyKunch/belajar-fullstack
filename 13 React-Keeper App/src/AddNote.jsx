import React from "react"

export default function AddNote(props) {
    const [notes, setNotes] = React.useState(
        {
            title: "",
            content: ""
        }
    )

    function handleChange(event) {
        const {name, value} = event.target
        setNotes(prevNotes => {
            return {
                ...prevNotes,
                [name]: value
            }
        })
    }

    function submitNote(event) {
        props.onAdd(notes)
        setNotes({
            title: "",
            content: ""
        })
        event.preventDefault()
    }

    return (
        <div>
            <form>
                <input 
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    value={notes.title}
                />
                <textarea 
                    name="content"
                    placeholder="Take a note.."
                    rows="3"
                    onChange={handleChange}
                    value={notes.content}
                />
                <button onClick={submitNote}>Add</button>
            </form>
        </div>
    )
}