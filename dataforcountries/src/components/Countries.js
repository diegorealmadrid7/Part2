import React, { useState } from 'react'
import CountrySimple from './CountrySimple'
import Country from './Country'

const Countries = ({ countries, newSearch }) => {
    const [ showCountry, setShowCountry ] = useState(undefined)

    const show = (event) => {
        const cont = countries.filter(country => country.name.includes(event.target.value))
        setShowCountry(cont[0])
    }
    
    const entries = countries.filter(country =>
        country.name.toUpperCase().includes(newSearch.toUpperCase())
    )
    
    if (entries.length >= 10) {
        return <p>too many entries, specify another filter</p>
    }
    if (showCountry !== undefined) {
        return (
            <Country
            key={showCountry.name}
            name={showCountry.name}
            capital={showCountry.capital}
            population={showCountry.population}
            languages={showCountry.languages}
            flagUrl={showCountry.flag}            
            />
        )
    }
    if (entries.length > 1) {
        return (
            <ul>
                {countries
                .filter(country =>
                country.name.toUpperCase().includes(newSearch.toUpperCase())
                )
                .map(country => (
                    <CountrySimple 
                    key={country.name}
                    name={country.name}
                    country={country}
                    show={show}
                    />
                ))}
            </ul>
        )
    }
    
    return (
        <ul>
            {countries
            .filter(country => 
            country.name.toUpperCase().includes(newSearch.toUpperCase())
            )
            .map(country => (
                <Country 
                key={country.name}
                name={country.name}
                capital={country.capital}
                population={country.population}
                languages={country.languages}
                flagUrl={country.flag}
                />
            ))}
        </ul>
    )
}

export default Countries