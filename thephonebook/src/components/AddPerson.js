import React from 'react'

const NewPerson = (props) => {
    return(
        <form onSubmit={props.addPerson}>
          name: 
          <input 
            value={props.newName}
            onChange={props.handleNameChange}
          />
          number:
          <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
          <button type="submit">add</button>      
      </form>
    )
}

export default NewPerson