import { useState, useEffect } from 'react'
import countryService from './services/countries'

const FilterForm = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      Search:{''}
      <input value={searchTerm} onChange={onSearchChange} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
    <h2>find countries</h2>
    <FilterForm searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
    </div>

  )
}

export default App
