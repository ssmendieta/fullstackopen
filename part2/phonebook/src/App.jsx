import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import Formulario from './Components/Form'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
  },[])


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