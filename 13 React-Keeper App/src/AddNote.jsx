import React from "react"
import AddIcon from '@mui/icons-material/Add'
import Zoom from '@mui/material/Zoom'
import Fab from '@mui/material/Fab'

export default function AddNote(props) {
    const [notes, setNotes] = React.useState(
        {
            title: "",
            content: ""
        }
    )

    const [isFocus, setIsFocus] = React.useState(false)

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

    function handleFocus() {
        setIsFocus(true)
    }

    return (
        <div>
            <form className="create-note">
                {isFocus && <input 
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    value={notes.title}
                />}
                <textarea 
                    name="content"
                    placeholder="Take a note.."
                    rows={isFocus ? "3" : "1"}
                    onChange={handleChange}
                    value={notes.content}
                    onFocus={handleFocus}
                />
            <Zoom in={isFocus ? true : false}>
                <Fab onClick={submitNote}>
                    <AddIcon />
                </Fab>
            </Zoom>
            </form>
        </div>
    )
}