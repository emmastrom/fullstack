import Name from "./Name"

const Persons = ({ personsToShow }) => {
    return (
        <div>
        {personsToShow.map(person =>
            <Name key={person.name} name={person} number={person} />
          )}
        </div>
    )
  }
  
  export default Persons