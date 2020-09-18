import React, { useState } from 'react'
import Persons from './components/Persons'
import NewPerson from './components/AddPerson'
import FilterPerson from './components/FilterPerson'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Diego Rojas', number: '1161394793' },
    { name: 'Pablo Paiva', number: '1231231232' },
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      date: new Date().toISOString(),
      number: newNumber,
      id: persons.length + 1,
    }

    const previusPerson = persons.find(n => n.name === newName)

    console.log(previusPerson ? previusPerson.name : 'no match')
    console.log(`name: ${newName} number: ${newNumber}`)

    if (previusPerson) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPerson
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h2>Add new</h2>
      <NewPerson
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
    <h2>Numbers</h2>
     <Persons persons={persons} newSearch={newSearch} />
    debug: {newName}
    </div>
  )
}

export default App