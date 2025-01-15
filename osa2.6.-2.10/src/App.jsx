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

    const double = persons.filter((person) => person.name === newName).length
    const result = double === 0 ? setPersons(persons.concat(nameObject)) : alert(`${newName} is already added to phonebook`)

    if (double === 0) {
      personService
        .create(nameObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
      })
    console.log(double)
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

  const handleDelete = (id) => {
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
      })
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
