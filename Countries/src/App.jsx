import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countriesService from './services/countries'

function App() {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        const countryInfo = initialCountries.map(country => {
          return (
            {
              name: country.name.common,
              capital: country.capital,
              area: country.area,
              languages: country.languages,
              flag: country.flags.png

            }
          )
        })
        setCountries(countryInfo)
        setSearchResults(countryInfo)
      })
  }, [])

  const handleShow = (showCountry) => {
    setSearchName(showCountry)
    setSearchResults(countries.filter(country => country.name.toUpperCase().includes(showCountry.toUpperCase())))
  }

  const handleSearch = (event) => {
    //console.log(event.target.value)
    setSearchName(event.target.value)
    setSearchResults(countries.filter(country => country.name.toUpperCase().includes(event.target.value.toUpperCase())))
    //console.log(searchResults)
  }

  return (
    <div>
      <Filter search={searchName} handle={handleSearch} />
      <Countries results={searchResults} handleShow={handleShow} />
    </div>
  )
}

export default App
