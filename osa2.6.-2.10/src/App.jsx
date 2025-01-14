import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const double = persons.filter((person) => person.name === newName).length
    const result = double === 0 ? setPersons(persons.concat(nameObject)) : alert(`${newName} is already added to phonebook`)

    if (double === 0) {
      axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        console.log(response)
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
      
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App
