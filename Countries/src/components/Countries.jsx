import Country from './Country'

const Countries = ({ results }) => {
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
                    {country.name}
                </li>
            )
            
    )

  }
  
  export default Countries