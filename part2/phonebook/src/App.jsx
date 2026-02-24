import { useState } from 'react'
import Filter from './Components/Filter'
import Formulario from './Components/Form'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('New Person')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState(persons)


  const handleOnChangeName = (e) =>{
    setNewName(e.target.value)
  }
  
  const handleOnChangeNumber = (e) =>{
    setNewNumber(e.target.value)
  }

  const handleOnSubmit = (e) =>{
    e.preventDefault()
    if (newName === "" || newNumber === ""){
      alert('falta un dato')
    }else {
    const dup = persons.some(person => {
      return(
        (person.name.toLowerCase() === newName.toLowerCase() || person.number === newNumber)
      )})
    if (dup){
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
    }else {
    const newPerson = {name: newName , number: newNumber}
    setPersons(persons.concat(newPerson))
    setFilter(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
    }
  }
  }

  const handleOnChangeFilter = (e) =>{
    setPersons(filter.filter(person => person.name.toLowerCase().includes(e.target.value) ))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleOnChange={handleOnChangeFilter}/>
      <h2>add a new</h2>
      <Formulario handleOnChangeName={handleOnChangeName} handleOnSubmit={handleOnSubmit} handleOnChangeNumber={handleOnChangeNumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      {
        persons.map(person => <Persons key={person.name} person={person} />
        )
      }
    </div>
  )
}

export default App