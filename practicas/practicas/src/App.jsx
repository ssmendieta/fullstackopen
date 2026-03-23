import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './Services/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  const [newV, setV] = useState([])
  
  useEffect(() => {
    //console.log('effect')
    noteService
      .getAll()
      .then(initialNote => {
        setNotes(initialNote)
      })
  }, [])


  const [showAll, setShowAll] = useState(true)
  const noteShow = showAll ? notes : notes.filter(note => note.important === true)

  const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
    const objectNote = {
      id: notes.length +1,
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
    .create(objectNote)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    }
    )
  }
  const toggleImportanceOf = id => {
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService
      .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
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
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
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