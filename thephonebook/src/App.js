import React, { useState, useEffect } from 'react'
import NewPerson from './components/AddPerson'
import FilterPerson from './components/FilterPerson'
import Persons from './components/Persons'
import personsServices from './services/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [notification, setNotification] = useState(null);
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const notifyWith = (message, type='success') => {
    setNotification({message, type})
    setTimeout(() => {
        setNotification(null)
    }, 5000)
  }

  const handleDeletePerson = (id) => {
    const toDelete = persons.find(p => p.id === id)
    //const ok = window.confirm(`Delete ${toDelete.name}?`)
    if(window.confirm(`Delete ${toDelete.name}?`)) {
        personsServices
          .deletePerson(id)
          .then(response => {
            setPersons(persons.filter(n => n.id !== id))
            notifyWith(`Deleted ${toDelete.name}`)
            setNewNumber("")
            setNewName("")
            setNewSearch("")
          })
          .catch(() => {
            setPersons(persons.filter(n => n.id !== id))
            notifyWith(`User ${toDelete.name} has already been deleted from the server`)
          })
      }
  }
  
  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      date: new Date().toISOString(),
      number: newNumber,
    }

    const previusPerson = persons.find(n => n.name === newName)

    if (previusPerson) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      personsServices
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const personsToShow = newSearch.length === 0 ?
        persons :
        persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase()) > 0)
        
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification}/>

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
    <table className='table'>
      <tbody>
        <Persons
          persons={personsToShow}
          handleDeletePerson={handleDeletePerson}
        />
      </tbody>
    </table>
    </div>
  )
}

export default App