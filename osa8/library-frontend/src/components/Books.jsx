import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GENRE_BOOKS } from "../queries"

/* eslint-disable react/prop-types */
const Books = props => {
  const books = props.books
  const [genre, setGenre] = useState("all genres")

  const results = useQuery(GENRE_BOOKS, { variables: { genre } })
  if (results.loading) {
    return <div>loading...</div>
  }

  console.log(results)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genre === "all genres"
            ? books.map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : results.data.allBooks.map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {books.map(b =>
        b.genres.map(g => (
          <button key={g} value={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))
      )}
      <button onClick={() => setGenre("all genres")}>all genres</button>
    </div>
  )
}

export default Books
