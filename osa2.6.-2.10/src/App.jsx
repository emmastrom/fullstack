import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${nameObject.name} is already added to phonebook, replace old number with a new one?`)) {
        const updated = persons.find((person) => person.name === newName)
        updated.number = newNumber
        personService
        .update(updated)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      personService
      .create(nameObject)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
  })

  }
    }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value)
  }

  const handleDelete = (id, name) => {

    if (window.confirm(`Delete ${name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
      })
    }
  }

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={searchName} handle={handleSearch} />

      <h2>add a new</h2>

      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} />
      
      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )

}

export default App
