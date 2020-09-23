import React, { useState, useEffect } from 'react'
import getAll from './services/restCountries'
import FilterCountries from './components/FilterCountries'
import Countries from './components/Countries'

const App = () =>{
  const [ countries, setCountries ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')
  
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  useEffect(() => {
    getAll().then(response => setCountries(response))
  }, [])

  return (
    <div>
      <h1>Data for Countries</h1>
      <FilterCountries 
      newSearch={newSearch}
      handleSearchChange={handleSearchChange}
      />
      <h2>Select country</h2>
      <Countries
      countries={countries}
      newSearch={newSearch}
      />
    </div>
  )
}

export default App