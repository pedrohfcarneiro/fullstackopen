import React, { useState, useEffect } from 'react'
import personsService from './services/personsService'
import Notification from './components/Notification'
import './index.css'

const Person = ({name, phone, handleDelete}) => {
    return(
        <div>
            {name} {phone} <Button handleClick={handleDelete} text="delete" />
        </div>
    )
}

const Persons = ({persons, deleteCallbackFunction}) => {
    return(
        <div>
            {persons.map((person) => {
                return(
                    <Person key={person.name} name={person.name} phone={person.phone} handleDelete={deleteCallbackFunction(person.id, person.name)} />
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

const Button = ({handleClick,text}) => {
    return(
        <div>
            <button onClick={handleClick}>{text}</button>
        </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  const [filter, setFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)

  const [isError, setIsError] = useState(false)

  let isInDatabase = false

  const getPeople = () => {
    console.log('effect')
    personsService.getAll()
        .then(allPersons => {
            console.log(allPersons)
            setPersons(allPersons)
        })
        .catch(error => {
          alert(
            `fail`
          )
        })
  }

  useEffect(getPeople, [])

  const addPerson = (event) => {
    event.preventDefault()
    personsService.getAll()
        .then(dbPersons => {
            console.log(dbPersons)
            const dbNames = dbPersons.map(p => p.name)
            console.log(dbNames)
            console.log(newName)
            console.log("opa")
            console.log(dbNames.includes(newName))
            if(dbNames.includes(newName)){
                console.log("tornou true")
                isInDatabase = true
                console.log(isInDatabase)
                if(!alreadyExistsInState(persons)){  //It is in database but not in States
                    const newPersonObject = {
                        name: newName,
                        phone: newPhone
                    }
                    personsService.createPerson(newPersonObject)
                        .then(newPerson => {
                            console.log('promise fullfilled')
                            setPersons(persons.concat(newPerson))
                            setNewName('')
                            setNewPhone('')
                            setNotificationMessage('Added new person')
                            setIsError(false)
                            setTimeout(() => {
                                setNotificationMessage(null)
                                setIsError(null)
                            }, 5000)
                        })
                        .catch(error => {
                            console.log(error.response.data)
                            alert(
                                `fail`
                            )
                            setNotificationMessage(error.response.data)
                            setIsError(true)
                            setTimeout(() => {
                                setNotificationMessage(null)
                                setIsError(null)
                            }, 5000)
                        })
                }
                else {  //if there already is in state and db
                    console.log("entrou aqui")
                    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                        const currentPerson = persons.find(p => p.name === newName)
                        const changedPerson = {...currentPerson, phone: newPhone}
                        personsService.updatePerson(currentPerson.id, changedPerson)
                            .then(changedPersonsArray => {
                                setPersons(persons.map(person => person.name !== newName ? person : changedPerson))
                                setNewName('')
                                setNewPhone('')
                                setNotificationMessage('Added new person')
                                setIsError(false)
                                setTimeout(() => {
                                    setNotificationMessage(null)
                                    setIsError(null)
                                }, 5000)
                            })
                            .catch(error => {
                                console.log(error.response.data)
                                alert(
                                    `fail`
                                )
                                setNotificationMessage(error.response.data)
                                setIsError(true)
                                setTimeout(() => {
                                    setNotificationMessage(null)
                                    setIsError(null)
                                }, 5000)
                            })
                    }
                }
            }
            else {
                if(!alreadyExistsInState(persons)){ //It is not in database and not in state
                    const newPersonObject = {
                        name: newName,
                        phone: newPhone
                    }
                    personsService.createPerson(newPersonObject)
                        .then(newPerson => {
                            console.log('promise fullfilled')
                            setPersons(persons.concat(newPerson))
                            setNewName('')
                            setNewPhone('')
                            setNotificationMessage('Added new person')
                            setIsError(false)
                            setTimeout(() => {
                                setNotificationMessage(null)
                                setIsError(null)
                            }, 5000)
                        })
                        .catch(error => {
                            console.log(error.response)
                            console.log(error.response.data)
                            alert(
                                `fail`
                            )
                            setNotificationMessage(error.response.data.error, true)
                            setIsError(true)
                            setTimeout(() => {
                                setNotificationMessage(null)
                                setIsError(null)
                            }, 5000)
                        })
                }
                else {  //It is not in database but it is in state
                    console.log("n�o est� na base mas est� nos estados")
                }
            }
        })
  }

  const deletePerson = (id, name) => {
    return (() => {
        if(window.confirm(`delete ${name}?`)) {
        personsService.deletePerson(id)
            .then(response => {
                console.log(response)
                setPersons(persons.filter(person => person.id !== id))
                setNotificationMessage('Deleted Person')
                setIsError(false)
                setTimeout(() => {
                    setNotificationMessage(null)
                    setIsError(null)
                }, 5000)
            })
            .catch(error => {
                alert(
                    `fail`
                )
                setNotificationMessage('error')
                setIsError(true)
                setTimeout(() => {
                    setNotificationMessage(null)
                    setIsError(null)
                }, 5000)
            })
        }
        else
            return
    }
    )
  }

  const alreadyExistsInState = (persons) => {
    const names = persons.map(person => person.name)
    if(names.includes(newName)){
        return true
    }
    else
        return false
  }



  const CheckIfNewNameIsInDatabase = () => {
    personsService.getAll()
        .then(persons => {
            console.log(persons)
            const dbNames = persons.map(p => p.name)
            console.log(dbNames)
            console.log(newName)
            console.log(dbNames.includes(newName))
            if(dbNames.includes(newName)){
                console.log("tornou true")
                isInDatabase = true
                console.log(isInDatabase)
            }
            else
                isInDatabase = false
        })
  }

const handleNameChange = (event) => {
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
      <Notification message={notificationMessage} isError={isError}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <Form addPerson = {addPerson} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteCallbackFunction = {deletePerson} />
    </div>
  )
}

export default App