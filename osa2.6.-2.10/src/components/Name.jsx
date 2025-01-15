import React from 'react'

const Name = ({ name, handleDelete }) => {
    return (
      <ul>{name.name} {name.number} <button onClick={handleDelete}>delete</button></ul>
    )
  }
  
  export default Name