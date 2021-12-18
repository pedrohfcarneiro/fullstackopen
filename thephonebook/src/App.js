import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({name, phone}) => {
    return(
        <div>
            {name} {phone}
        </div>
    )
}

const Persons = ({persons}) => {
    return(
        <div>
            {persons.map((person) => {
                return(
                    <Person key={person.name} name={person.name} phone={person.phone} />
                )
            })}
        </div>
    )
}

const Form = ({addPerson, handleNameChange, handlePhoneChange, newName, newPhone}) => {
    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                  name: <input value = {newName} onChange={handleNameChange} />
                </div>
                <div>
                  phone: <input value = {newPhone} onChange={handlePhoneChange} />
                </div>
                <div>
                  <button type="submit">add</button>
                </div>
              </form>
        </div>
    )
}

const Filter = (props) => {
    return(
        <div>
            filter shown with: <input value = {props.filter} onChange={props.handleFilterChange} />
        </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
            console.log('promise fullfilled')
            setPersons(response.data)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(!alreadyExists(persons)){
        const personObject = {
            name: newName,
            phone: newPhone
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewPhone('')
    }
    else {
        const message = `phone or name is already added to phonebook`
        window.alert(message)
    }
  }

  const alreadyExists = (persons) => {
    const names = persons.map(person => person.name)
    const phones = persons.map(person => person.phone)
    console.log(names)
    if(names.includes(newName))
        return true
    else if(phones.includes(newPhone))
        return true
    else
        return false
  }

const handleNameChange = (event) => {
    console.log(alreadyExists(persons))
    setNewName(event.target.value)
}

const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
}

const handleFilterChange = (event) => {
    setFilter(event.target.value)
}

const personsToShow = (filter === '' || null) ? persons : persons.filter(person => {
    //person.name.containt(filter) || person.phone.contains(filter)
    return person.name.toLowerCase().includes(filter.toLowerCase()) || person.phone.toLowerCase().includes(filter.toLowerCase())
    
})

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <Form addPerson = {addPerson} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App