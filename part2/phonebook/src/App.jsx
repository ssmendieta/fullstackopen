import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import Formulario from './Components/Form'
import Persons from './Components/Persons'
import phoneServices from './Services/phone'
import phone from './Services/phone'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    phoneServices
    .getAll()
    .then(initialNumbs => {
      setPersons(initialNumbs)
    }
    )
  },[])


  const [newName, setNewName] = useState('New Person')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


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
    }else if (verifyDup()){
        alert(`${newName} is already added to phonebook`)
        setNewName("")
        setNewNumber("")
    }else if ((persons.some(person => {
          return(
            (person.name.toLowerCase() === newName.toLowerCase())
          )
        }))){
        const person = persons.filter(person => person.name.toLowerCase() === newName.toLocaleLowerCase())[0]
        console.log(person)

        if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
          const changedPerson = {...person, number:newNumber}
          phoneServices.update(person.id, changedPerson)
          .then(updatedPerson => setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson )))
          setNewName(" ")
          setNewNumber(" ")
        }
    
    }else{
        const newPerson = {name: newName , number: newNumber}
        setNewName("")
        setNewNumber("")

        phoneServices
        .create(newPerson)
        .then(response =>  setPersons(persons.concat(response)) )
    }
  }
  

  const verifyDup = () => {
    const dup = persons.some(person => {
      return(
        (person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber)
      )})    
    if (dup) {
      return true
    }else{
      return false
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter)
  )

  const handleOnChangeFilter = (e) => {
    setFilter(e.target.value)  
  }

  const handleOnDelete = (id) => {
    //console.log(id)
    const persona = persons.filter(person => person.id === id)
    //console.log(persona[0].name)
    if(window.confirm(`Delete ${persona[0].name} ?`)){
      phoneServices.borrar(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleOnChange={handleOnChangeFilter}/>
      <h2>add a new</h2>
      <Formulario handleOnChangeName={handleOnChangeName} handleOnSubmit={handleOnSubmit} handleOnChangeNumber={handleOnChangeNumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      {
        personsToShow.map(person => <Persons key={person.id} person={person} handleOnDelete={handleOnDelete}/>
        )
      }
    </div>
  )
}

export default App