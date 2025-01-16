import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
          setNotificationMessage(`Updated ${nameObject.name}'s number`)
        })
        .catch(error => {
          setErrorMessage(`Update of ${nameObject.name}'s number failed`)
        })
      }
    } else {
      personService
      .create(nameObject)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${nameObject.name}`)
  })
  }
  setTimeout(() => {
    setNotificationMessage(null)
    setErrorMessage(null)
  }, 5000)
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
        setNotificationMessage(`Deleted ${name}`)
      })
      .catch(error => {
        setErrorMessage(`Information of ${name}' has already been removed from server`)
  })
    }
    setTimeout(() => {
      setNotificationMessage(null)
      setErrorMessage(null)
    }, 5000)
  }

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Error message={errorMessage} />

      <Notification message={notificationMessage} />

      <Filter search={searchName} handle={handleSearch} />

      <h2>add a new</h2>

      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} />
      
      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )

}

export default App
