import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countriesService from './services/countries'

function App() {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [forecast, setForecast] = useState({})

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
              flag: country.flags.png,
              capital: country.capital,
              capitalInfo: country.capitalInfo.latlng

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
    setSearchName(event.target.value)
    setSearchResults(countries.filter(country => country.name.toUpperCase().includes(event.target.value.toUpperCase())))
  }

  const currentWeather = (country) => {
      console.log(country.capitalInfo[1])
      countriesService
        .getWeather(country.capitalInfo[0], country.capitalInfo[1])
        .then(weatherInfo => {
          const currentForecast = {
            name: country.name,
            temp: weatherInfo.current.temperature_2m,
            wind: weatherInfo.current.wind_speed_10m
          }
          setForecast(currentForecast)
      })
  }
  return (
    <div>
      <Filter search={searchName} handle={handleSearch} />
      <Countries results={searchResults} handleShow={handleShow} weather={currentWeather} forecast={forecast} />
    </div>
  )
}

export default App
