import React, { useState, useEffect } from 'react';
import contactService from './services/contacts'
import './index.css'

const FilterForm = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      Search:{''}
      <input value={searchTerm} onChange={onSearchChange} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onAddPerson }) => {
  return (
    <form onSubmit={onAddPerson}>
      <div>
        name:{''}
        <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number:{''}
        <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, onRemoveContact }) => {
  return (
    <div>
      {persons.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}
          <button onClick={() => onRemoveContact(person.name, person.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [operationMessage, setOperationMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = persons.find((person) => person.name === newName);
    if (duplicate) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        contactService
          .update(duplicate.name, duplicate.id, newNumber)
          .then(() => {
            contactService.getAll().then(response => {
              setPersons(response.data)
              setOperationMessage(`The number of ${newName} has been updated.`)
              setTimeout(() => {
                setOperationMessage(null);
              }, 5000);
              setNewName('')
              setNewNumber('')
            });
          })
          .catch(() => {
            setOperationMessage(`Information of ${newName} has already been deleted from the server`);
        setTimeout(() => {
          setOperationMessage(null)
        }, 5000)
          })
      }
      return;
    }
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    contactService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setOperationMessage(`${newName} has been added.`)
              setTimeout(() => {
                setOperationMessage(null);
              }, 5000);
        setNewName('')
        setNewNumber('')
      })
  }
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const removeContact = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService
        .remove(id)
        .then(() => {
          contactService.getAll().then(response => {
            setPersons(response.data)
            setOperationMessage(`${name} has been deleted.`)
            setTimeout(() => {
              setOperationMessage(null);
            }, 5000);
          })
        })
    }
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
      <h3>Add a new person</h3>
      <Notification message={operationMessage} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAddPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onRemoveContact={removeContact}/>
    </div>
  )
}

export default App
