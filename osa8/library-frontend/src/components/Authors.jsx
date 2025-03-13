import { useState } from "react"
import { UPDATE_BIRTHYEAR, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client"
import Select from "react-select"

/* eslint-disable react/prop-types */
const Authors = props => {
  const [born, setBorn] = useState("")
  const authors = props.authors
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  const [updateBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async event => {
    event.preventDefault()
    console.log(selectedAuthor)
    updateBirthyear({ variables: { name: selectedAuthor.label, born } })
    console.log("update birthyear...")

    setSelectedAuthor(null)
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
            <tr key={a.id}>
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
        <Select
          defaultValue={selectedAuthor}
          onChange={setSelectedAuthor}
          placeholder={"Select author"}
          options={options}
        />
        <div>
          born
          <input
            type="number"
            value={born}
            onInput={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
