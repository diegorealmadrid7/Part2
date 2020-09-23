import React from 'react'

const CountrySimple = ({ name, country, show }) => {
    return (
        <li key={name}>
            {name}
        <button value={country.name} onClick={show}>
            show
        </button>
        </li>
    )
}

export default CountrySimple