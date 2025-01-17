import Country from './Country'

const Countries = ({ results, handleShow }) => {
    if (results.length === 1) {
        return (
            <Country result={results} />
        )
    }
    return (
        results.length > 10
            ? <div>Too many matches, specify another filter</div>
            : results.map(country =>
                <li key={country.name}>
                    {country.name} <button onClick={() => handleShow(country.name)}>show</button>
                </li>
            )
            
    )

  }
  
  export default Countries