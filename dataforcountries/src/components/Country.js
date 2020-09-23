import React from 'react'
import Weather from './Weather'
const Country = ({ name, capital, population, languages, flagUrl }) => {
    console.log(capital)
    return (
        <div>
            <h1>{name}</h1>
            <p>Capital {capital}</p>
            <p>Population {population}</p>
            <br />
            <h3>Languages</h3>
            <ul>
                {languages.map(language => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>
            <br />
            <img src={flagUrl} alt='No img found' width='350' height='250' />
            <Weather capital={capital}/>
        </div>
    )
}

export default Country