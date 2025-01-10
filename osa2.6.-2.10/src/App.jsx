import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(false)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const double = persons.filter((person) => person.name === newName).length
    const result = double === 0 ? setPersons(persons.concat(nameObject)) : alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewNumber('')
    console.log(double)
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
