import React from 'react'

const Country = ({ result, forecast }) => {
  return (
    <div>
      <h1>{result[0].name}</h1>
      <ul>capital {result[0].capital}</ul>
      <ul>area {result[0].area}</ul>
      <h3>languages:</h3>
      {Object.entries(result[0].languages).map( ([short, language]) => <li key={short}>{language}</li>)}
      <p></p>
      <img src={result[0].flag} />
      <h2>Weather in {result[0].capital}</h2>
      <ul>temp: {forecast.temp} Celcius</ul>
      <ul>wind: {forecast.wind} km/h</ul>

    </div>
  )
  }
  
  export default Country