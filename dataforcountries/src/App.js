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



const Language = (props) => {
    return(
        <li>{props.language}</li>
    )
}

const Languages = (props) => {
    console.log(props)
    return(
        <ul>
            {Object.values(props.languages).map(language => <Language key={language} language={language}/>)}
        </ul>
    )
}

const Weather = (props) => {
    const [weather, setWeather] = useState({
        temp: '',
        wind: {
            speed: '',
            deg: ''
        }
    })

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        console.log(props.country.capital)
        console.log(api_key)
        const url = 'https://api.openweathermap.org/data/2.5/weather?q='.concat(props.country.capital,'&appid=',api_key)
        console.log(url)
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setWeather({
                    temp: response.data.main.temp,
                    wind: {
                        speed: response.data.wind.speed,
                        deg: response.data.wind.deg
                    }
                })
            })
    },[])

    const tempCelsius = weather.temp - 273.15

    return(
        <div>
            <h2>Weather in {props.country.capital}</h2>
            <p>temperature: {tempCelsius} Celsius</p>
            <p>wind: {weather.wind.speed} mph direction {weather.wind.deg} degrees </p>
        </div>
    )
}

const Info = (props) =>{
    return(
            <div>
                <h3>{props.country.name.common}</h3>
                <p>capital {props.country.capital}</p>
                <p>population {props.country.population}</p>
                <h2>languages</h2>
                <Languages languages={props.country.languages} />
                <img src={props.country.flags.png} />
                <Weather country={props.country} />
            </div>
        )
}

const Countries = (props) => {
    return(
        <div>
            {props.countries.map(country => {
                return(
                    <Country key={country.name.common} country={country} name={country.name.common} capital={country.capital} population={country.population} languages={country.languages} flag={country.flags.png} countriesFiltered={props.countries} />
                )
            })}
        </div>
    )
}

const Country = (props) => {
    console.log(props)
    const [show, setShow] = useState(false)
    console.log(show)

    //Function that returns a function to change the state of 'show'
    const showCountryInfo = (showBoolean) => () => {
            setShow(!showBoolean)
    }

    if(props.countriesFiltered.length > 1) {
        if(!show){
            return(
                <div>
                    {props.name} <Button handleClick={showCountryInfo(show)} text="show" />
                </div>
            )
        }
        else {
            return(
                <div>
                    {props.name} <Button handleClick={showCountryInfo(show)} text="show" />
                    <Info country={props.country} />
                </div>
            )
        }
    }
    else {
        return(
            <div>
                <Info country={props.country} />
            </div>
        )
    }
}

const Button = (props) => {
    return(
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const App = () => {
  
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])
    
    const handleQueryChange = (event) => {
        setQuery(event.target.value)
        console.log(countriesFiltered)
    }

    const getCountriesHandler = response => {
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