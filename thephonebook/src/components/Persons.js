import React from 'react'

const Persons = ({ persons, handleDeletePerson }) => {
    return (
        persons.map(person => 
            <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td><button onClick={() => handleDeletePerson(person.id)}>delete</button></td>
            </tr>
        )
    )
}

export default Persons