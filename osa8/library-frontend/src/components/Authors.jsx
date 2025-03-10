import { useState } from "react"
import { UPDATE_BIRTHYEAR, ALL_AUTHORS, ALL_BOOKS } from "../queries"
import { useMutation } from "@apollo/client"

/* eslint-disable react/prop-types */
const Authors = props => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  const authors = props.authors

  const [updateBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const submit = async event => {
    event.preventDefault()

    updateBirthyear({ variables: { name, born } })

    console.log("update birthyear...")

    setName("")
    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
      </div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
