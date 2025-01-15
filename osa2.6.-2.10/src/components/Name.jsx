import React from 'react'

const Name = ({ name, handleDelete }) => {
    return (
      <li>{name.name} {name.number} <button onClick={handleDelete}>delete</button></li>
    )
  }
  
  export default Name