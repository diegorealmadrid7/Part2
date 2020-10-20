import React, { useState, useEffect } from 'react'
import NewPerson from './components/AddPerson'
import FilterPerson from './components/FilterPerson'
import Persons from './components/Persons'
import personsServices from './services/Persons'
import Notification from './components/Notification'
import './index.css'

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

  const notifyWith = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
        setNotification(null)
    }, 5000)
  }

  const handleDeletePerson = (id) => {
    const toDelete = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${toDelete.name}?`)) {
        personsServices
          .deletePerson(id)
          .then(response => {
            setPersons(persons.filter(n => n.id !== id))
            notifyWith(`Deleted ${toDelete.name}`, 'deleted')
            setNewNumber("")
            setNewName("")
            setNewSearch("")
          })
          .catch(() => {
            setPersons(persons.filter(n => n.id !== id))
            notifyWith(`User ${toDelete.name} has already been deleted from the server`, 'deleted')
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
    //
    if (previusPerson) {
      const ok = window.confirm(`${previusPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (ok) {
      console.log('updateo')       
        previusPerson.number = newNumber
        personsServices
          .update(previusPerson.id,previusPerson)
          .then(returnedPersons => {
            notifyWith(`Number updated for ${previusPerson.name}`, 'succes')
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            setPersons(persons.filter(n => n.name !== newName))
            notifyWith(`User ${previusPerson.name} has already been deleted from the server`, 'deleted')
          })
      }
    } else {
      console.log('creo')
      personsServices
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          notifyWith(`${returnedPersons.name} added`, 'succes')
          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
          setPersons(persons.filter(n => n.name !== newName))
          notifyWith(`User ${persons.name} could not been added`, 'deleted')
        })
    }
  }

  const personsToShow = newSearch.length === 0 ?
        persons :
        persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase()) > 0)
        
  
  return (
    <div>
      <h1>Phonebook</h1>

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