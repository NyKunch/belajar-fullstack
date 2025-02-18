import React from "react"
import Header from "./Header"
import Note from "./Note"
import Footer from "./Footer"
// import notes from "./notes"
import AddNote from "./AddNote"

export default function App() {
    const [notes, setNotes] = React.useState([])

    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote]
        })
    }

    function deleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id
            })
        })
    }

    return (
        <>
            <Header />
            <AddNote 
                onAdd={addNote}
            />
            {notes.map((note, index) => {
                return <Note 
                    key={index}
                    id={index}
                    title={note.title}
                    content={note.content}
                    onDelete={deleteNote}
                />
            })}
            <Footer />
        </>
    )
} 