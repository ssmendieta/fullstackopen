import Note from "./components/Note"
import { useState } from "react"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  const [showAll, setShowAll] = useState(false)
  const noteShow = showAll ? notes : notes.filter(note => note.important === true)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
    const objectNote = {
      id: notes.length +1,
      content: newNote,
      important: Math.random() < 0.5,
    }

    setNotes(notes.concat(objectNote))
    setNewNote(" ")


  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {noteShow.map(note => 
          <Note key={note.id} note={note.content} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">Añadir</button>
      </form>
    </div>
  )
}

export default App