import React, { useState, useEffect } from 'react';
import axios from 'axios'

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

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    const duplicate = persons.find((person) => person.name === newName)
    if (duplicate) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
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

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
      <h3>Add a new person</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAddPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
