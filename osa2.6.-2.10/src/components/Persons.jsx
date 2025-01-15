import React from "react"
import Name from "./Name"

const Persons = ({ personsToShow, handleDelete }) => {
    return (
        <div>
        {personsToShow.map(person =>
            <Name key={person.name} name={person} number={person} handleDelete={() => handleDelete(person.id)} />
          )}
        </div>
    )
  }
  
  export default Persons