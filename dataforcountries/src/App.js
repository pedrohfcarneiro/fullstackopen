import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchField = (props) => {
    return(
        <div>
            find countries <input value = {props.query} onChange={props.handleQueryChange} />
        </div>
    )
}

const Result = (props) => {
    if(props.countries.length > 10)
        return <p>Too many matches, specify another filter</p>
    else {
        console.log('mostrando filtrados')
        return(
            <Countries countries={props.countries} />
        )
    }
}

const Countries = (props) => {
    return(
        <div>
            {props.countries.map(country => {
                return(
                    <Country key={country.name.common} name={country.name.common} capital={country.capital} population={country.population} languages={country.languages} countriesFiltered={props.countries} />
                )
            })}
        </div>
    )
}

const Language = (props) => {
    return(
        <div>   
            {props.language}
        </div>
    )
}

const Languages = (props) => {
    return(
        <div>
            <Language language = {props.languages} />
        </div>
    )
}

const Country = (props) => {
    console.log(props)
    if(props.countriesFiltered.length > 1) {
        return(
            <div>
                {props.name}
            </div>
        )
    }
    else {
        return(
            <div>
                <h3>{props.name}</h3>
                {props.capital}
                {props.population}
                <h2>languages</h2>
                <Languages languages={props.languages} />
            </div>
        )
    }
}

const App = () => {
  
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])
    
    const handleQueryChange = (event) => {
        setQuery(event.target.value)
        console.log(countriesFiltered)
    }

    const getCountriesHandler = response => {
        console.log(response.data[0].languages)
        setCountries(response.data)
    }

    const countriesFiltered = (query === '' || null) ? countries : countries.filter((country) => {
        return country.name.common.toLowerCase().includes(query.toLowerCase())
    })

    const promise= axios.get('https://restcountries.com/v3.1/all')

    const hook = () => {
        promise.then(getCountriesHandler)
    }

    useEffect(hook, [])
    
    return (
    <div>
        <SearchField query={query} handleQueryChange={handleQueryChange} />
        <Result countries={countriesFiltered} />
    </div>
  )
}

export default App